-- CreateTable
CREATE TABLE "Store" (
    "id" SERIAL NOT NULL,
    "hash" TEXT NOT NULL,
    "url" TEXT,
    "accessToken" TEXT NOT NULL,
    "storefrontToken" TEXT,
    "customerAttributeFieldId" INTEGER,
    "subscriptionsAttributeFieldId" INTEGER,
    "scriptId" TEXT,
    "widgetId" TEXT,
    "widgetTemplateId" TEXT,
    "widgetPlacementId" TEXT,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL,
    "token" TEXT NOT NULL DEFAULT E'',
    "email" TEXT NOT NULL,
    "username" TEXT,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UsersOnStores" (
    "userId" INTEGER NOT NULL,
    "storeId" INTEGER NOT NULL,

    PRIMARY KEY ("userId","storeId")
);

-- CreateTable
CREATE TABLE "Stripe" (
    "id" SERIAL NOT NULL,
    "accessToken" TEXT NOT NULL,
    "refreshToken" TEXT NOT NULL,
    "publishableKey" TEXT NOT NULL,
    "stripeUserId" TEXT,
    "email" TEXT,
    "dashboardDisplayName" TEXT,
    "storeId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StripeProduct" (
    "id" TEXT NOT NULL,
    "priceIds" TEXT NOT NULL,

    PRIMARY KEY ("id","priceIds")
);

-- CreateTable
CREATE TABLE "DisplaySetting" (
    "id" SERIAL NOT NULL,
    "widgetLabel" TEXT NOT NULL,
    "widgetBgColor" TEXT NOT NULL,
    "widgetTextColor" TEXT NOT NULL,
    "buttonLabel" TEXT NOT NULL,
    "buttonBgColor" TEXT NOT NULL,
    "buttonTextColor" TEXT NOT NULL,
    "storeId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StoreSetting" (
    "id" SERIAL NOT NULL,
    "location" TEXT DEFAULT E'',
    "importData" BOOLEAN DEFAULT false,
    "includeDesc" BOOLEAN DEFAULT false,
    "includeImg" BOOLEAN DEFAULT false,
    "keepLevels" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "storeId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Store.hash_unique" ON "Store"("hash");

-- CreateIndex
CREATE UNIQUE INDEX "User.email_unique" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Stripe.storeId_unique" ON "Stripe"("storeId");

-- CreateIndex
CREATE UNIQUE INDEX "DisplaySetting.storeId_unique" ON "DisplaySetting"("storeId");

-- CreateIndex
CREATE UNIQUE INDEX "StoreSetting.storeId_unique" ON "StoreSetting"("storeId");

-- AddForeignKey
ALTER TABLE "UsersOnStores" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersOnStores" ADD FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Stripe" ADD FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DisplaySetting" ADD FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StoreSetting" ADD FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE CASCADE ON UPDATE CASCADE;
