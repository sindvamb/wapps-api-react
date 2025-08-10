import { ReactNode } from 'react';

export type AppMenuItem = {
    label: string;
    icon?: string;
    to?: string;
    items?: AppMenuItem[];
    badge?: string;
    badgeClass?: string;
    target?: string;
    disabled?: boolean;
    visible?: boolean;
    class?: string;
};

export interface AppMenuItemProps {
    item: AppMenuItem;
    parentKey?: string;
    index?: number;
    root?: boolean;
    className?: string;
}
