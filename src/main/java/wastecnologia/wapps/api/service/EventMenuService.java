package wastecnologia.wapps.api.service;

import java.util.List;
import java.util.UUID;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import wastecnologia.wapps.api.domain.Company;
import wastecnologia.wapps.api.domain.EventCustomer;
import wastecnologia.wapps.api.domain.EventMenu;
import wastecnologia.wapps.api.domain.Menu;
import wastecnologia.wapps.api.model.EventMenuDTO;
import wastecnologia.wapps.api.repos.CompanyRepository;
import wastecnologia.wapps.api.repos.EventCustomerRepository;
import wastecnologia.wapps.api.repos.EventMenuRepository;
import wastecnologia.wapps.api.repos.MenuRepository;
import wastecnologia.wapps.api.util.NotFoundException;


@Service
public class EventMenuService {

    private final EventMenuRepository eventMenuRepository;
    private final CompanyRepository companyRepository;
    private final EventCustomerRepository eventCustomerRepository;
    private final MenuRepository menuRepository;

    public EventMenuService(final EventMenuRepository eventMenuRepository,
            final CompanyRepository companyRepository,
            final EventCustomerRepository eventCustomerRepository,
            final MenuRepository menuRepository) {
        this.eventMenuRepository = eventMenuRepository;
        this.companyRepository = companyRepository;
        this.eventCustomerRepository = eventCustomerRepository;
        this.menuRepository = menuRepository;
    }

    public List<EventMenuDTO> findAll() {
        final List<EventMenu> eventMenus = eventMenuRepository.findAll(Sort.by("id"));
        return eventMenus.stream()
                .map(eventMenu -> mapToDTO(eventMenu, new EventMenuDTO()))
                .toList();
    }

    public EventMenuDTO get(final UUID id) {
        return eventMenuRepository.findById(id)
                .map(eventMenu -> mapToDTO(eventMenu, new EventMenuDTO()))
                .orElseThrow(NotFoundException::new);
    }

    public UUID create(final EventMenuDTO eventMenuDTO) {
        final EventMenu eventMenu = new EventMenu();
        mapToEntity(eventMenuDTO, eventMenu);
        return eventMenuRepository.save(eventMenu).getId();
    }

    public void update(final UUID id, final EventMenuDTO eventMenuDTO) {
        final EventMenu eventMenu = eventMenuRepository.findById(id)
                .orElseThrow(NotFoundException::new);
        mapToEntity(eventMenuDTO, eventMenu);
        eventMenuRepository.save(eventMenu);
    }

    public void delete(final UUID id) {
        eventMenuRepository.deleteById(id);
    }

    private EventMenuDTO mapToDTO(final EventMenu eventMenu, final EventMenuDTO eventMenuDTO) {
        eventMenuDTO.setId(eventMenu.getId());
        eventMenuDTO.setCompany(eventMenu.getCompany() == null ? null : eventMenu.getCompany().getId());
        eventMenuDTO.setEventCustomer(eventMenu.getEventCustomer() == null ? null : eventMenu.getEventCustomer().getId());
        eventMenuDTO.setMenu(eventMenu.getMenu() == null ? null : eventMenu.getMenu().getId());
        return eventMenuDTO;
    }

    private EventMenu mapToEntity(final EventMenuDTO eventMenuDTO, final EventMenu eventMenu) {
        final Company company = eventMenuDTO.getCompany() == null ? null : companyRepository.findById(eventMenuDTO.getCompany())
                .orElseThrow(() -> new NotFoundException("company not found"));
        eventMenu.setCompany(company);
        final EventCustomer eventCustomer = eventMenuDTO.getEventCustomer() == null ? null : eventCustomerRepository.findById(eventMenuDTO.getEventCustomer())
                .orElseThrow(() -> new NotFoundException("eventCustomer not found"));
        eventMenu.setEventCustomer(eventCustomer);
        final Menu menu = eventMenuDTO.getMenu() == null ? null : menuRepository.findById(eventMenuDTO.getMenu())
                .orElseThrow(() -> new NotFoundException("menu not found"));
        eventMenu.setMenu(menu);
        return eventMenu;
    }

}
