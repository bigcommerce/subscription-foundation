-- CreateTable
CREATE TABLE "Store" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
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
    "createdAt" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME
);

-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "token" TEXT NOT NULL DEFAULT '',
    "email" TEXT NOT NULL,
    "username" TEXT,
    "createdAt" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME
);

-- CreateTable
CREATE TABLE "UsersOnStores" (
    "userId" INTEGER NOT NULL,
    "storeId" INTEGER NOT NULL,

    PRIMARY KEY ("userId", "storeId"),
    FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("storeId") REFERENCES "Store" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Stripe" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "accessToken" TEXT NOT NULL,
    "refreshToken" TEXT NOT NULL,
    "publishableKey" TEXT NOT NULL,
    "stripeUserId" TEXT,
    "email" TEXT,
    "dashboardDisplayName" TEXT,
    "storeId" INTEGER NOT NULL,
    "createdAt" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    FOREIGN KEY ("storeId") REFERENCES "Store" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "StripeProduct" (
    "id" TEXT NOT NULL,
    "priceIds" TEXT NOT NULL,

    PRIMARY KEY ("id", "priceIds")
);

-- CreateTable
CREATE TABLE "DisplaySetting" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "widgetLabel" TEXT NOT NULL,
    "widgetBgColor" TEXT NOT NULL,
    "widgetTextColor" TEXT NOT NULL,
    "buttonLabel" TEXT NOT NULL,
    "buttonBgColor" TEXT NOT NULL,
    "buttonTextColor" TEXT NOT NULL,
    "storeId" INTEGER NOT NULL,
    "createdAt" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    FOREIGN KEY ("storeId") REFERENCES "Store" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "StoreSetting" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "location" TEXT DEFAULT '',
    "importData" BOOLEAN DEFAULT false,
    "includeDesc" BOOLEAN DEFAULT false,
    "includeImg" BOOLEAN DEFAULT false,
    "keepLevels" BOOLEAN DEFAULT false,
    "createdAt" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "storeId" INTEGER NOT NULL,
    FOREIGN KEY ("storeId") REFERENCES "Store" ("id") ON DELETE CASCADE ON UPDATE CASCADE
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
