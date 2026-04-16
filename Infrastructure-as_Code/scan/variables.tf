variable "location" {
  default = "Central India"
}

variable "resource_group_name" {
  default = "educonnect-rg"
}

variable "vm_size" {
  default = "Standard_B2s"
}

variable "admin_username" {
  default = "azureuser"
}

variable "public_key_path" {
  default = "~/.ssh/id_rsa.pub"
}
