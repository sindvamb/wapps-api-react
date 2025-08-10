export interface AppMenuBaseItem {
    type: 'item';
    label: string;
    icon?: string;
    to?: string;
    items?: AppMenuBaseItem[];
    disabled?: boolean;
    visible?: boolean;
    target?: string;
    command?: (e: { originalEvent: any, item: any }) => void;
}

export interface AppMenuSeparator {
    type: 'separator';
}

export type AppMenuItem = AppMenuBaseItem | AppMenuSeparator;
