# Least-privilege deploy identity: sync objects to the site bucket + invalidate CDN cache
resource "aws_iam_user" "deploy" {
  count = var.create_deploy_user ? 1 : 0

  name = "${var.project_name}-deploy"
  path = "/"
  tags = local.common_tags
}

data "aws_iam_policy_document" "deploy" {
  count = var.create_deploy_user ? 1 : 0

  statement {
    sid    = "ListSiteBucket"
    effect = "Allow"
    actions = [
      "s3:ListBucket",
      "s3:GetBucketLocation",
    ]
    resources = [local.s3_bucket_arn]
  }

  statement {
    sid    = "SyncSiteObjects"
    effect = "Allow"
    actions = [
      "s3:PutObject",
      "s3:GetObject",
      "s3:DeleteObject",
      "s3:AbortMultipartUpload",
      "s3:ListMultipartUploadParts",
    ]
    resources = ["${local.s3_bucket_arn}/*"]
  }

  statement {
    sid    = "InvalidateCloudFront"
    effect = "Allow"
    actions = [
      "cloudfront:CreateInvalidation",
      "cloudfront:GetInvalidation",
      "cloudfront:ListInvalidations",
    ]
    resources = [aws_cloudfront_distribution.site.arn]
  }
}

resource "aws_iam_user_policy" "deploy" {
  count = var.create_deploy_user ? 1 : 0

  name   = "${var.project_name}-deploy"
  user   = aws_iam_user.deploy[0].name
  policy = data.aws_iam_policy_document.deploy[0].json
}

# Access keys are NOT created here — create them manually in IAM console / CLI when needed.
# Never commit access keys or store them in Terraform state intentionally.
