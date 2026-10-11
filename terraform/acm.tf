# CloudFront requires ACM certificates in us-east-1
resource "aws_acm_certificate" "site" {
  provider = aws.us_east_1

  domain_name               = local.fqdn
  subject_alternative_names = []
  validation_method         = "DNS"

  lifecycle {
    create_before_destroy = true
  }

  tags = local.common_tags
}

# Validation waits until Cloudflare ACM CNAME + CAA records are in place and AWS issues the cert
resource "aws_acm_certificate_validation" "site" {
  provider = aws.us_east_1

  certificate_arn         = aws_acm_certificate.site.arn
  validation_record_fqdns = [for record in cloudflare_record.acm_validation : record.hostname]

  depends_on = [
    cloudflare_record.caa_amazon,
    cloudflare_record.acm_validation,
  ]
}
