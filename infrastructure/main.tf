provider "azurerm" {
  version = "1.22.1"
}

locals {
  recipe_backend_url = "http://${var.product}-recipe-backend-${var.env}.service.core-compute-${var.env}.internal"
  shared_rg          = "${var.product}-shared-infrastructure-${var.env}"
}

data "azurerm_key_vault" "key_vault" {
  name                = "${var.product}si-${var.env}"
  resource_group_name = "${local.shared_rg}"
}

data "azurerm_key_vault_secret" "appInsights-InstrumentationKey" {
  name      = "appInsights-InstrumentationKey"
  key_vault_id = "${data.azurerm_key_vault.key_vault.id}"
}

module "frontend" {
  source               = "git@github.com:hmcts/cnp-module-webapp?ref=master"
  product              = "${var.product}-frontend"
  location             = "${var.location}"
  env                  = "${var.env}"
  ilbIp                = "${var.ilbIp}"
  is_frontend          = true
  subscription         = "${var.subscription}"
  additional_host_name = "${var.product}.platform.hmcts.net"
  common_tags          = "${var.common_tags}"
  instance_size        = "I1"

  appinsights_instrumentation_key = "${data.azurerm_key_vault_secret.appInsights-InstrumentationKey.value}"

  app_settings = {
    # REDIS_HOST                       = "${module.redis-cache.host_name}"
    # REDIS_PORT                       = "${module.redis-cache.redis_port}"
    # REDIS_PASSWORD                   = "${module.redis-cache.access_key}"
    RECIPE_BACKEND_URL = "${local.recipe_backend_url}"

    WEBSITE_NODE_DEFAULT_VERSION       = "8.10.0"
    WEBSITE_PROACTIVE_AUTOHEAL_ENABLED = "${var.autoheal}"
  }
}
