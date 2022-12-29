// ----------- Import Controllers and docs
import updateAttr from "./updateAttributes";
import addToTenant from "./addToTenant";
import getTenantsMetadata from "./getTenantsMetadata";
// ----------- Import helpers
import {
  createController,
  createMethod,
  exportedMethods,
} from "../../libraries/helpers";

// ----------- Export raw controllers
export { updateAttr as updateAttributes, addToTenant as addToTenant };

// ----------- Declare controller paths

const method_addToTenant = createMethod(
  "post",
  "tenantuser",
  addToTenant,
  "Add user to a tenant"
);
const method_updateAttributes = createMethod(
  "patch",
  "attributes",
  updateAttr,
  "Update attributes from a user"
);
const method_getUserPartnersMetadata = createMethod(
  "get",
  "tenants",
  getTenantsMetadata,
  "Get user tenants"
);

// ----------- Contain controller paths in array

const methods: exportedMethods = [
  method_addToTenant,
  method_updateAttributes,
  method_getUserPartnersMetadata,
];

// ----------- Declare middlewares if needed for this prefix

// ----------- Export controller paths in continuation of a prefix
// ----------- Paths can be directly exported to avoid a new prefix if needed
// ----------- Add middlewares if needed for this entity
export default createController("user", methods, []);
