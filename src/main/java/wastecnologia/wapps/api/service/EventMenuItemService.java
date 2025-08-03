package wastecnologia.wapps.api.service;

import java.util.List;
import java.util.UUID;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import wastecnologia.wapps.api.domain.entity.Company;
import wastecnologia.wapps.api.domain.entity.EventMenuItem;
import wastecnologia.wapps.api.domain.entity.Menu;
import wastecnologia.wapps.api.domain.entity.MenuItem;
import wastecnologia.wapps.api.domain.dto.EventMenuItemDTO;
import wastecnologia.wapps.api.repository.CompanyRepository;
import wastecnologia.wapps.api.repository.EventMenuItemRepository;
import wastecnologia.wapps.api.repository.MenuItemRepository;
import wastecnologia.wapps.api.repository.MenuRepository;
import wastecnologia.wapps.api.util.NotFoundException;


@Service
public class EventMenuItemService {

    private final EventMenuItemRepository eventMenuItemRepository;
    private final CompanyRepository companyRepository;
    private final MenuItemRepository menuItemRepository;
    private final MenuRepository menuRepository;

    public EventMenuItemService(final EventMenuItemRepository eventMenuItemRepository,
            final CompanyRepository companyRepository, final MenuItemRepository menuItemRepository,
            final MenuRepository menuRepository) {
        this.eventMenuItemRepository = eventMenuItemRepository;
        this.companyRepository = companyRepository;
        this.menuItemRepository = menuItemRepository;
        this.menuRepository = menuRepository;
    }

    public List<EventMenuItemDTO> findAll() {
        final List<EventMenuItem> eventMenuItems = eventMenuItemRepository.findAll(Sort.by("id"));
        return eventMenuItems.stream()
                .map(eventMenuItem -> mapToDTO(eventMenuItem, new EventMenuItemDTO()))
                .toList();
    }

    public EventMenuItemDTO get(final UUID id) {
        return eventMenuItemRepository.findById(id)
                .map(eventMenuItem -> mapToDTO(eventMenuItem, new EventMenuItemDTO()))
                .orElseThrow(NotFoundException::new);
    }

    public UUID create(final EventMenuItemDTO eventMenuItemDTO) {
        final EventMenuItem eventMenuItem = new EventMenuItem();
        mapToEntity(eventMenuItemDTO, eventMenuItem);
        return eventMenuItemRepository.save(eventMenuItem).getId();
    }

    public void update(final UUID id, final EventMenuItemDTO eventMenuItemDTO) {
        final EventMenuItem eventMenuItem = eventMenuItemRepository.findById(id)
                .orElseThrow(NotFoundException::new);
        mapToEntity(eventMenuItemDTO, eventMenuItem);
        eventMenuItemRepository.save(eventMenuItem);
    }

    public void delete(final UUID id) {
        eventMenuItemRepository.deleteById(id);
    }

    private EventMenuItemDTO mapToDTO(final EventMenuItem eventMenuItem,
            final EventMenuItemDTO eventMenuItemDTO) {
        eventMenuItemDTO.setId(eventMenuItem.getId());
        eventMenuItemDTO.setCompany(eventMenuItem.getCompany() == null ? null : eventMenuItem.getCompany().getId());
        eventMenuItemDTO.setMenuItem(eventMenuItem.getMenuItem() == null ? null : eventMenuItem.getMenuItem().getId());
        eventMenuItemDTO.setMenu(eventMenuItem.getMenu() == null ? null : eventMenuItem.getMenu().getId());
        return eventMenuItemDTO;
    }

    private EventMenuItem mapToEntity(final EventMenuItemDTO eventMenuItemDTO,
            final EventMenuItem eventMenuItem) {
        final Company company = eventMenuItemDTO.getCompany() == null ? null : companyRepository.findById(eventMenuItemDTO.getCompany())
                .orElseThrow(() -> new NotFoundException("company not found"));
        eventMenuItem.setCompany(company);
        final MenuItem menuItem = eventMenuItemDTO.getMenuItem() == null ? null : menuItemRepository.findById(eventMenuItemDTO.getMenuItem())
                .orElseThrow(() -> new NotFoundException("menuItem not found"));
        eventMenuItem.setMenuItem(menuItem);
        final Menu menu = eventMenuItemDTO.getMenu() == null ? null : menuRepository.findById(eventMenuItemDTO.getMenu())
                .orElseThrow(() -> new NotFoundException("menu not found"));
        eventMenuItem.setMenu(menu);
        return eventMenuItem;
    }

}
