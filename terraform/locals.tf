locals {
  # Public site hostname: https://mahesh.qishub.in
  fqdn = "${var.site_subdomain}.${var.cloudflare_zone_name}"

  aliases = [local.fqdn]

  common_tags = merge(var.default_tags, {
    Name = var.project_name
  })
}

data "aws_caller_identity" "current" {}
