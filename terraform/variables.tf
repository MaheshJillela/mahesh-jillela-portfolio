variable "aws_profile" {
  description = "AWS CLI profile used by Terraform (no hardcoded credentials)."
  type        = string
  default     = "aws-mahesh"
}

variable "aws_region" {
  description = "Primary AWS region for resources (S3 bucket, etc.)."
  type        = string
  default     = "ap-south-1"
}

variable "project_name" {
  description = "Short name used for resource naming and tags."
  type        = string
  default     = "animated-experience-portfolio"
}

variable "cloudflare_zone_name" {
  description = "Apex domain / Cloudflare zone name (e.g. qishub.in)."
  type        = string
  default     = "qishub.in"
}

variable "site_subdomain" {
  description = "Subdomain under the Cloudflare zone (e.g. mahesh → mahesh.qishub.in)."
  type        = string
  default     = "mahesh"
}

variable "cloudflare_api_token" {
  description = "Cloudflare API token with Zone.DNS Edit (and Zone.Zone Read) for the zone. Never commit this value."
  type        = string
  sensitive   = true
}

variable "cloudflare_proxied" {
  description = "Whether Cloudflare should proxy the site CNAME (orange cloud). Must stay false so CloudFront + ACM terminate HTTPS."
  type        = bool
  default     = false

  validation {
    condition     = var.cloudflare_proxied == false
    error_message = "cloudflare_proxied must be false: CloudFront needs DNS-only (grey cloud) so browsers hit CloudFront with the ACM certificate."
  }
}

variable "existing_s3_bucket_name" {
  description = "Optional. If SCP denies s3:CreateBucket, set this to an admin-created bucket name. Leave empty to create project_name-account_id."
  type        = string
  default     = ""
}

variable "create_deploy_user" {
  description = "If true, create an IAM user with least-privilege permissions to sync S3 and invalidate CloudFront."
  type        = bool
  default     = true
}

variable "price_class" {
  description = "CloudFront price class. PriceClass_100 = NA + EU (cheapest)."
  type        = string
  default     = "PriceClass_100"

  validation {
    condition     = contains(["PriceClass_All", "PriceClass_200", "PriceClass_100"], var.price_class)
    error_message = "price_class must be PriceClass_All, PriceClass_200, or PriceClass_100."
  }
}

variable "default_tags" {
  description = "Tags applied to all supported AWS resources."
  type        = map(string)
  default = {
    Project   = "animated-experience-portfolio"
    ManagedBy = "terraform"
  }
}
