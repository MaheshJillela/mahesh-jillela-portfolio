output "s3_bucket_name" {
  description = "S3 bucket that stores the static site (upload .output/public here)."
  value       = local.s3_bucket_name
}

output "s3_bucket_arn" {
  description = "ARN of the site bucket."
  value       = local.s3_bucket_arn
}

output "cloudfront_distribution_id" {
  description = "CloudFront distribution ID (use for cache invalidation)."
  value       = aws_cloudfront_distribution.site.id
}

output "cloudfront_domain_name" {
  description = "CloudFront domain name (*.cloudfront.net)."
  value       = aws_cloudfront_distribution.site.domain_name
}

output "website_url" {
  description = "HTTPS URL for the custom domain."
  value       = "https://${local.fqdn}"
}

output "site_hostname" {
  description = "FQDN served by CloudFront (mahesh.qishub.in)."
  value       = local.fqdn
}

output "acm_certificate_arn" {
  description = "ACM certificate ARN (us-east-1) attached to CloudFront."
  value       = aws_acm_certificate.site.arn
}

output "acm_validation_records" {
  description = "ACM DNS validation CNAMEs created in Cloudflare (for reference)."
  value = {
    for k, r in cloudflare_record.acm_validation : k => {
      name    = r.name
      type    = r.type
      content = r.content
    }
  }
}

output "cloudflare_zone_id" {
  description = "Cloudflare zone ID for the apex domain."
  value       = data.cloudflare_zone.site.id
}

output "cloudflare_site_record_id" {
  description = "Cloudflare DNS record ID for the site CNAME."
  value       = cloudflare_record.site.id
}

output "cloudflare_proxied" {
  description = "Whether the site CNAME is proxied (must be false for CloudFront + ACM)."
  value       = cloudflare_record.site.proxied
}

output "deploy_iam_user_name" {
  description = "IAM user for deployments (create access keys manually if needed)."
  value       = var.create_deploy_user ? aws_iam_user.deploy[0].name : null
}

output "aws_profile" {
  description = "AWS CLI profile used by this stack."
  value       = var.aws_profile
}

output "aws_region" {
  description = "Primary AWS region."
  value       = var.aws_region
}
