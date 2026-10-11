# Primary region for S3, CloudFront (distribution config), IAM
provider "aws" {
  region  = var.aws_region
  profile = var.aws_profile

  default_tags {
    tags = var.default_tags
  }
}

# ACM certificates used by CloudFront MUST be issued in us-east-1
provider "aws" {
  alias   = "us_east_1"
  region  = "us-east-1"
  profile = var.aws_profile

  default_tags {
    tags = var.default_tags
  }
}

# DNS for qishub.in (zone + records) — credentials via variables only
provider "cloudflare" {
  api_token = var.cloudflare_api_token
}
