"use client";

import React from "react";
import { SettingsMenu } from "@/ui/components/SettingsMenu";
import { FeatherLock } from "@subframe/core";
import { FeatherBellRing } from "@subframe/core";
import { FeatherCreditCard } from "@subframe/core";
import { FeatherShapes } from "@subframe/core";
import { FeatherUsers } from "@subframe/core";
import { Button } from "@/components/ui/button";
import { FeatherUpload } from "@subframe/core";
import { TextArea } from "@/components/ui/textarea";
import { Alert } from "@/components/ui/alert";

function AccountSettings() {
  return (
    <div className="flex h-full w-full items-start mobile:flex-col mobile:flex-nowrap mobile:gap-0">
      <SettingsMenu className="mobile:w-full mobile:grow mobile:shrink-0 mobile:basis-0">
        <span className="w-full text-heading-3 font-heading-3 text-default-font">
          Settings
        </span>
        <div className="flex w-full flex-col items-start gap-2">
          <span className="w-full text-body-bold font-body-bold text-default-font">
            Personal
          </span>
          <div className="flex w-full flex-col items-start gap-1">
            <SettingsMenu.Item selected={true} label="Account" />
            <SettingsMenu.Item icon={<FeatherLock />} label="API Keys" />
            <SettingsMenu.Item
              icon={<FeatherBellRing />}
              label="Notifications"
            />
          </div>
        </div>
        <div className="flex w-full flex-col items-start gap-2">
          <span className="w-full text-body-bold font-body-bold text-default-font">
            Workspace
          </span>
          <div className="flex w-full flex-col items-start gap-1">
            <SettingsMenu.Item icon={<FeatherCreditCard />} label="Billing" />
            <SettingsMenu.Item icon={<FeatherShapes />} label="Integrations" />
            <SettingsMenu.Item icon={<FeatherUsers />} label="Team Members" />
          </div>
        </div>
      </SettingsMenu>
      <div className="container max-w-none flex grow shrink-0 basis-0 flex-col items-center gap-6 self-stretch bg-default-background py-12 shadow-sm">
        <div className="flex w-full max-w-[576px] flex-col items-start gap-12">
          <div className="flex w-full flex-col items-start gap-1">
            <span className="w-full text-heading-2 font-heading-2 text-default-font">
              Account
            </span>
            <span className="w-full text-body font-body text-subtext-color">
              Update your profile and personal details here
            </span>
          </div>
          <div className="flex w-full flex-col items-start gap-6">
            <span className="text-heading-3 font-heading-3 text-default-font">
              Profile
            </span>
            <div className="flex w-full flex-col items-start gap-4">
              <span className="text-body-bold font-body-bold text-default-font">
                Avatar
              </span>
              <div className="flex items-center gap-4">
                <img
                  className="h-16 w-16 flex-none object-cover [clip-path:circle()]"
                  src="https://res.cloudinary.com/subframe/image/upload/v1711417513/shared/kwut7rhuyivweg8tmyzl.jpg"
                />
                <div className="flex flex-col items-start gap-2">
                  <Button
                    variant="neutral-secondary"
                    icon={<FeatherUpload />}
                    onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                  >
                    Upload
                  </Button>
                  <span className="text-caption font-caption text-subtext-color">
                    For best results, upload an image 512x512 or larger.
                  </span>
                </div>
              </div>
            </div>
            <div className="flex w-full items-center gap-4">
              <TextArea
                className="h-auto grow shrink-0 basis-0"
                label="First name"
                helpText=""
              >
                <TextArea.Input
                  placeholder="Josef"
                  value=""
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {}}
                />
              </TextArea>
              <TextArea
                className="h-auto grow shrink-0 basis-0"
                label="Last name"
                helpText=""
              >
                <TextArea.Input
                  placeholder="Albers"
                  value=""
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {}}
                />
              </TextArea>
            </div>
            <div className="flex w-full items-center gap-4">
              <TextArea
                className="h-auto grow shrink-0 basis-0"
                label="Email"
                helpText=""
              >
                <TextArea.Input
                  placeholder="josef@subframe.com"
                  value=""
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {}}
                />
              </TextArea>
            </div>
          </div>
          <div className="flex h-px w-full flex-none flex-col items-center gap-2 bg-neutral-border" />
          <div className="flex w-full flex-col items-start gap-6">
            <span className="text-heading-3 font-heading-3 text-default-font">
              Password
            </span>
            <TextArea
              className="h-auto w-full flex-none"
              label="Current password"
              helpText=""
            >
              <TextArea.Input
                type="password"
                placeholder="Enter current password"
                value=""
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {}}
              />
            </TextArea>
            <TextArea
              className="h-auto w-full flex-none"
              label="New password"
              helpText="Your password must have at least 8 characters, include one uppercase letter, and one number."
            >
              <TextArea.Input
                type="password"
                placeholder="Enter new password"
                value=""
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {}}
              />
            </TextArea>
            <TextArea className="h-auto w-full flex-none" label="" helpText="">
              <TextArea.Input
                type="password"
                placeholder="Re-type new password"
                value=""
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {}}
              />
            </TextField>
            <div className="flex w-full flex-col items-start justify-center gap-6">
              <Button
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
              >
                Change password
              </Button>
            </div>
          </div>
          <div className="flex h-px w-full flex-none flex-col items-center gap-2 bg-neutral-border" />
          <div className="flex w-full flex-col items-start gap-6">
            <span className="text-heading-3 font-heading-3 text-default-font">
              Danger zone
            </span>
            <Alert
              variant="error"
              icon={null}
              title="Delete account"
              description="Permanently remove your account. This action is not reversible."
              actions={
                <Button
                  variant="destructive-secondary"
                  onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                >
                  Delete account
                </Button>
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountSettings;
