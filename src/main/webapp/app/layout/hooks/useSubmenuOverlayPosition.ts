import { useContext } from 'react';
import { LayoutContext } from '../context/layoutcontext';
import { MenuContext } from '../context/menucontext';

export const useSubmenuOverlayPosition = ({ item, key, isActive }) => {
    const { layoutState, isSlim, isSlimPlus, isHorizontal, isDesktop } = useContext(LayoutContext);
    const { activeMenu } = useContext(MenuContext);

    const isSubmenuStatic = () => {
        return layoutState.staticMenuDesktopInactive && isDesktop();
    };

    const isSubmenuActive = () => {
        return activeMenu === key || activeMenu.startsWith(key + '-');
    };

    return { isSubmenuStatic, isSlim, isSlimPlus, isHorizontal, isDesktop, isSubmenuActive };
};