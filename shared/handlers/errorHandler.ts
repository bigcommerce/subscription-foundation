import alertManager from "@/frontend/libs/alerts";

export const errorHandler = function(error: any){
  console.log('errorHandler :: error :: ', error);
  alertManager.add({
    messages: [
      {
        text: error.message
      }
    ],
    type: "error",
    autoDismiss: true
  });
}