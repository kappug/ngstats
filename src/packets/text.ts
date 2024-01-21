export interface Text {
  type: string;
  needsTranslation: boolean;
  sourceName?: string;
  message?: string;
  parameters?: string[];
  xuid: string;
  platformChatId: string;
}
