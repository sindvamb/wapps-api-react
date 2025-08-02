package wastecnologia.wapps.api.service;

import java.util.List;
import java.util.UUID;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import wastecnologia.wapps.api.domain.Company;
import wastecnologia.wapps.api.domain.EventMenu;
import wastecnologia.wapps.api.domain.EventMenuItem;
import wastecnologia.wapps.api.domain.Menu;
import wastecnologia.wapps.api.domain.MenuItem;
import wastecnologia.wapps.api.model.MenuDTO;
import wastecnologia.wapps.api.repos.CompanyRepository;
import wastecnologia.wapps.api.repos.EventMenuItemRepository;
import wastecnologia.wapps.api.repos.EventMenuRepository;
import wastecnologia.wapps.api.repos.MenuItemRepository;
import wastecnologia.wapps.api.repos.MenuRepository;
import wastecnologia.wapps.api.util.NotFoundException;
import wastecnologia.wapps.api.util.ReferencedWarning;


@Service
public class MenuService {

    private final MenuRepository menuRepository;
    private final CompanyRepository companyRepository;
    private final EventMenuItemRepository eventMenuItemRepository;
    private final EventMenuRepository eventMenuRepository;
    private final MenuItemRepository menuItemRepository;

    public MenuService(final MenuRepository menuRepository,
            final CompanyRepository companyRepository,
            final EventMenuItemRepository eventMenuItemRepository,
            final EventMenuRepository eventMenuRepository,
            final MenuItemRepository menuItemRepository) {
        this.menuRepository = menuRepository;
        this.companyRepository = companyRepository;
        this.eventMenuItemRepository = eventMenuItemRepository;
        this.eventMenuRepository = eventMenuRepository;
        this.menuItemRepository = menuItemRepository;
    }

    public List<MenuDTO> findAll() {
        final List<Menu> menus = menuRepository.findAll(Sort.by("id"));
        return menus.stream()
                .map(menu -> mapToDTO(menu, new MenuDTO()))
                .toList();
    }

    public MenuDTO get(final UUID id) {
        return menuRepository.findById(id)
                .map(menu -> mapToDTO(menu, new MenuDTO()))
                .orElseThrow(NotFoundException::new);
    }

    public UUID create(final MenuDTO menuDTO) {
        final Menu menu = new Menu();
        mapToEntity(menuDTO, menu);
        return menuRepository.save(menu).getId();
    }

    public void update(final UUID id, final MenuDTO menuDTO) {
        final Menu menu = menuRepository.findById(id)
                .orElseThrow(NotFoundException::new);
        mapToEntity(menuDTO, menu);
        menuRepository.save(menu);
    }

    public void delete(final UUID id) {
        menuRepository.deleteById(id);
    }

    private MenuDTO mapToDTO(final Menu menu, final MenuDTO menuDTO) {
        menuDTO.setId(menu.getId());
        menuDTO.setName(menu.getName());
        menuDTO.setDescription(menu.getDescription());
        menuDTO.setCompany(menu.getCompany() == null ? null : menu.getCompany().getId());
        return menuDTO;
    }

    private Menu mapToEntity(final MenuDTO menuDTO, final Menu menu) {
        menu.setName(menuDTO.getName());
        menu.setDescription(menuDTO.getDescription());
        final Company company = menuDTO.getCompany() == null ? null : companyRepository.findById(menuDTO.getCompany())
                .orElseThrow(() -> new NotFoundException("company not found"));
        menu.setCompany(company);
        return menu;
    }

    public ReferencedWarning getReferencedWarning(final UUID id) {
        final ReferencedWarning referencedWarning = new ReferencedWarning();
        final Menu menu = menuRepository.findById(id)
                .orElseThrow(NotFoundException::new);
        final EventMenuItem menuEventMenuItem = eventMenuItemRepository.findFirstByMenu(menu);
        if (menuEventMenuItem != null) {
            referencedWarning.setKey("menu.eventMenuItem.menu.referenced");
            referencedWarning.addParam(menuEventMenuItem.getId());
            return referencedWarning;
        }
        final EventMenu menuEventMenu = eventMenuRepository.findFirstByMenu(menu);
        if (menuEventMenu != null) {
            referencedWarning.setKey("menu.eventMenu.menu.referenced");
            referencedWarning.addParam(menuEventMenu.getId());
            return referencedWarning;
        }
        final MenuItem menuMenuItem = menuItemRepository.findFirstByMenu(menu);
        if (menuMenuItem != null) {
            referencedWarning.setKey("menu.menuItem.menu.referenced");
            referencedWarning.addParam(menuMenuItem.getId());
            return referencedWarning;
        }
        return null;
    }

}
