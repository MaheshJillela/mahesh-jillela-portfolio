locals {
  create_s3_bucket = var.existing_s3_bucket_name == ""
  # Prefer existing name when set so Terraform does not evaluate aws_s3_bucket.site[0] with count=0
  s3_bucket_name = var.existing_s3_bucket_name != "" ? var.existing_s3_bucket_name : aws_s3_bucket.site[0].id
  s3_bucket_arn  = "arn:aws:s3:::${local.s3_bucket_name}"
}

resource "aws_s3_bucket" "site" {
  count = local.create_s3_bucket ? 1 : 0

  bucket = "${var.project_name}-${data.aws_caller_identity.current.account_id}"

  tags = local.common_tags
}

data "aws_s3_bucket" "existing" {
  count = local.create_s3_bucket ? 0 : 1

  bucket = var.existing_s3_bucket_name
}

resource "aws_s3_bucket_versioning" "site" {
  bucket = local.s3_bucket_name

  versioning_configuration {
    status = "Enabled"
  }

  depends_on = [
    aws_s3_bucket.site,
    data.aws_s3_bucket.existing,
  ]
}

resource "aws_s3_bucket_server_side_encryption_configuration" "site" {
  bucket = local.s3_bucket_name

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
    bucket_key_enabled = true
  }

  depends_on = [
    aws_s3_bucket.site,
    data.aws_s3_bucket.existing,
  ]
}

resource "aws_s3_bucket_public_access_block" "site" {
  bucket = local.s3_bucket_name

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true

  depends_on = [
    aws_s3_bucket.site,
    data.aws_s3_bucket.existing,
  ]
}

resource "aws_s3_bucket_ownership_controls" "site" {
  bucket = local.s3_bucket_name

  rule {
    object_ownership = "BucketOwnerEnforced"
  }

  depends_on = [
    aws_s3_bucket.site,
    data.aws_s3_bucket.existing,
  ]
}

# Only CloudFront (via OAC) may read objects — no public bucket access
data "aws_iam_policy_document" "site_bucket" {
  statement {
    sid    = "AllowCloudFrontServicePrincipalRead"
    effect = "Allow"

    principals {
      type        = "Service"
      identifiers = ["cloudfront.amazonaws.com"]
    }

    actions = [
      "s3:GetObject",
    ]

    resources = [
      "${local.s3_bucket_arn}/*",
    ]

    condition {
      test     = "StringEquals"
      variable = "AWS:SourceArn"
      values   = [aws_cloudfront_distribution.site.arn]
    }
  }
}

resource "aws_s3_bucket_policy" "site" {
  bucket = local.s3_bucket_name
  policy = data.aws_iam_policy_document.site_bucket.json

  depends_on = [
    aws_s3_bucket_public_access_block.site,
  ]
}
