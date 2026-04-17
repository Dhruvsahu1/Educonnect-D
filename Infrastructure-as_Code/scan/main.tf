resource "azurerm_resource_group" "rg" {
  name     = var.resource_group_name
  location = var.location
}


module "network" {
  source              = "./modules/network"
  resource_group_name = azurerm_resource_group.rg.name
  location            = var.location
}

module "vm" {
  source              = "./modules/compute"
  resource_group_name = azurerm_resource_group.rg.name
  location            = var.location
  vm_name        = var.vm_name
  subnet_id       = module.network.subnet_id
  nsg_id         = module.network.nsg_id
  admin_username  = var.admin_username
  public_key_path = var.public_key_path
  vm_size         = var.vm_size
}
