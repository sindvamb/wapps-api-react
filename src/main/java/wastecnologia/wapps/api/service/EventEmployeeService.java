package wastecnologia.wapps.api.service;

import java.util.List;
import java.util.UUID;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import wastecnologia.wapps.api.domain.Company;
import wastecnologia.wapps.api.domain.Employee;
import wastecnologia.wapps.api.domain.EventCustomer;
import wastecnologia.wapps.api.domain.EventEmployee;
import wastecnologia.wapps.api.model.EventEmployeeDTO;
import wastecnologia.wapps.api.repos.CompanyRepository;
import wastecnologia.wapps.api.repos.EmployeeRepository;
import wastecnologia.wapps.api.repos.EventCustomerRepository;
import wastecnologia.wapps.api.repos.EventEmployeeRepository;
import wastecnologia.wapps.api.util.NotFoundException;


@Service
public class EventEmployeeService {

    private final EventEmployeeRepository eventEmployeeRepository;
    private final CompanyRepository companyRepository;
    private final EmployeeRepository employeeRepository;
    private final EventCustomerRepository eventCustomerRepository;

    public EventEmployeeService(final EventEmployeeRepository eventEmployeeRepository,
            final CompanyRepository companyRepository, final EmployeeRepository employeeRepository,
            final EventCustomerRepository eventCustomerRepository) {
        this.eventEmployeeRepository = eventEmployeeRepository;
        this.companyRepository = companyRepository;
        this.employeeRepository = employeeRepository;
        this.eventCustomerRepository = eventCustomerRepository;
    }

    public List<EventEmployeeDTO> findAll() {
        final List<EventEmployee> eventEmployees = eventEmployeeRepository.findAll(Sort.by("id"));
        return eventEmployees.stream()
                .map(eventEmployee -> mapToDTO(eventEmployee, new EventEmployeeDTO()))
                .toList();
    }

    public EventEmployeeDTO get(final UUID id) {
        return eventEmployeeRepository.findById(id)
                .map(eventEmployee -> mapToDTO(eventEmployee, new EventEmployeeDTO()))
                .orElseThrow(NotFoundException::new);
    }

    public UUID create(final EventEmployeeDTO eventEmployeeDTO) {
        final EventEmployee eventEmployee = new EventEmployee();
        mapToEntity(eventEmployeeDTO, eventEmployee);
        return eventEmployeeRepository.save(eventEmployee).getId();
    }

    public void update(final UUID id, final EventEmployeeDTO eventEmployeeDTO) {
        final EventEmployee eventEmployee = eventEmployeeRepository.findById(id)
                .orElseThrow(NotFoundException::new);
        mapToEntity(eventEmployeeDTO, eventEmployee);
        eventEmployeeRepository.save(eventEmployee);
    }

    public void delete(final UUID id) {
        eventEmployeeRepository.deleteById(id);
    }

    private EventEmployeeDTO mapToDTO(final EventEmployee eventEmployee,
            final EventEmployeeDTO eventEmployeeDTO) {
        eventEmployeeDTO.setId(eventEmployee.getId());
        eventEmployeeDTO.setCompany(eventEmployee.getCompany() == null ? null : eventEmployee.getCompany().getId());
        eventEmployeeDTO.setEmployee(eventEmployee.getEmployee() == null ? null : eventEmployee.getEmployee().getId());
        eventEmployeeDTO.setEventCustomer(eventEmployee.getEventCustomer() == null ? null : eventEmployee.getEventCustomer().getId());
        return eventEmployeeDTO;
    }

    private EventEmployee mapToEntity(final EventEmployeeDTO eventEmployeeDTO,
            final EventEmployee eventEmployee) {
        final Company company = eventEmployeeDTO.getCompany() == null ? null : companyRepository.findById(eventEmployeeDTO.getCompany())
                .orElseThrow(() -> new NotFoundException("company not found"));
        eventEmployee.setCompany(company);
        final Employee employee = eventEmployeeDTO.getEmployee() == null ? null : employeeRepository.findById(eventEmployeeDTO.getEmployee())
                .orElseThrow(() -> new NotFoundException("employee not found"));
        eventEmployee.setEmployee(employee);
        final EventCustomer eventCustomer = eventEmployeeDTO.getEventCustomer() == null ? null : eventCustomerRepository.findById(eventEmployeeDTO.getEventCustomer())
                .orElseThrow(() -> new NotFoundException("eventCustomer not found"));
        eventEmployee.setEventCustomer(eventCustomer);
        return eventEmployee;
    }

}
