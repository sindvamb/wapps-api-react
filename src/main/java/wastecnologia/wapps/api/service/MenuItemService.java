package wastecnologia.wapps.api.service;

import java.util.List;
import java.util.UUID;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import wastecnologia.wapps.api.domain.entity.EventMenuItem;
import wastecnologia.wapps.api.domain.entity.Menu;
import wastecnologia.wapps.api.domain.entity.MenuItem;
import wastecnologia.wapps.api.domain.dto.MenuItemDTO;
import wastecnologia.wapps.api.repository.EventMenuItemRepository;
import wastecnologia.wapps.api.repository.MenuItemRepository;
import wastecnologia.wapps.api.repository.MenuRepository;
import wastecnologia.wapps.api.util.NotFoundException;
import wastecnologia.wapps.api.util.ReferencedWarning;


@Service
public class MenuItemService {

    private final MenuItemRepository menuItemRepository;
    private final MenuRepository menuRepository;
    private final EventMenuItemRepository eventMenuItemRepository;

    public MenuItemService(final MenuItemRepository menuItemRepository,
            final MenuRepository menuRepository,
            final EventMenuItemRepository eventMenuItemRepository) {
        this.menuItemRepository = menuItemRepository;
        this.menuRepository = menuRepository;
        this.eventMenuItemRepository = eventMenuItemRepository;
    }

    public List<MenuItemDTO> findAll() {
        final List<MenuItem> menuItems = menuItemRepository.findAll(Sort.by("id"));
        return menuItems.stream()
                .map(menuItem -> mapToDTO(menuItem, new MenuItemDTO()))
                .toList();
    }

    public MenuItemDTO get(final UUID id) {
        return menuItemRepository.findById(id)
                .map(menuItem -> mapToDTO(menuItem, new MenuItemDTO()))
                .orElseThrow(NotFoundException::new);
    }

    public UUID create(final MenuItemDTO menuItemDTO) {
        final MenuItem menuItem = new MenuItem();
        mapToEntity(menuItemDTO, menuItem);
        return menuItemRepository.save(menuItem).getId();
    }

    public void update(final UUID id, final MenuItemDTO menuItemDTO) {
        final MenuItem menuItem = menuItemRepository.findById(id)
                .orElseThrow(NotFoundException::new);
        mapToEntity(menuItemDTO, menuItem);
        menuItemRepository.save(menuItem);
    }

    public void delete(final UUID id) {
        menuItemRepository.deleteById(id);
    }

    private MenuItemDTO mapToDTO(final MenuItem menuItem, final MenuItemDTO menuItemDTO) {
        menuItemDTO.setId(menuItem.getId());
        menuItemDTO.setName(menuItem.getName());
        menuItemDTO.setDescription(menuItem.getDescription());
        menuItemDTO.setQuantity(menuItem.getQuantity());
        menuItemDTO.setType(menuItem.getType());
        menuItemDTO.setGramish(menuItem.getGramish());
        menuItemDTO.setMeasuredUnit(menuItem.getMeasuredUnit());
        menuItemDTO.setMenu(menuItem.getMenu() == null ? null : menuItem.getMenu().getId());
        return menuItemDTO;
    }

    private MenuItem mapToEntity(final MenuItemDTO menuItemDTO, final MenuItem menuItem) {
        menuItem.setName(menuItemDTO.getName());
        menuItem.setDescription(menuItemDTO.getDescription());
        menuItem.setQuantity(menuItemDTO.getQuantity());
        menuItem.setType(menuItemDTO.getType());
        menuItem.setGramish(menuItemDTO.getGramish());
        menuItem.setMeasuredUnit(menuItemDTO.getMeasuredUnit());
        final Menu menu = menuItemDTO.getMenu() == null ? null : menuRepository.findById(menuItemDTO.getMenu())
                .orElseThrow(() -> new NotFoundException("menu not found"));
        menuItem.setMenu(menu);
        return menuItem;
    }

    public ReferencedWarning getReferencedWarning(final UUID id) {
        final ReferencedWarning referencedWarning = new ReferencedWarning();
        final MenuItem menuItem = menuItemRepository.findById(id)
                .orElseThrow(NotFoundException::new);
        final EventMenuItem menuItemEventMenuItem = eventMenuItemRepository.findFirstByMenuItem(menuItem);
        if (menuItemEventMenuItem != null) {
            referencedWarning.setKey("menuItem.eventMenuItem.menuItem.referenced");
            referencedWarning.addParam(menuItemEventMenuItem.getId());
            return referencedWarning;
        }
        return null;
    }

}
