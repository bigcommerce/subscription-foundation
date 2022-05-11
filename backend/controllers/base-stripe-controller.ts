import { AuthApiController } from "./auth-api-controller";
import { StripeService } from "@/backend/services/stripe.service";
import { appContainer } from "@/shared/di-container/app";

export abstract class BaseStripeController extends AuthApiController {
  //#region Properties
  
  public requiresAuth = true;
  public stripeService: StripeService;
  
  //#endregion

  constructor() {
    super();
    this.stripeService = appContainer.resolve(StripeService);
  }

}
