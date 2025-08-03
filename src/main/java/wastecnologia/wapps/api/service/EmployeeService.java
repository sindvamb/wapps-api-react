package wastecnologia.wapps.api.service;

import java.util.List;
import java.util.UUID;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import wastecnologia.wapps.api.domain.entity.Company;
import wastecnologia.wapps.api.domain.entity.Employee;
import wastecnologia.wapps.api.domain.entity.EventEmployee;
import wastecnologia.wapps.api.domain.dto.EmployeeDTO;
import wastecnologia.wapps.api.repository.CompanyRepository;
import wastecnologia.wapps.api.repository.EmployeeRepository;
import wastecnologia.wapps.api.repository.EventEmployeeRepository;
import wastecnologia.wapps.api.util.NotFoundException;
import wastecnologia.wapps.api.util.ReferencedWarning;


@Service
public class EmployeeService {

    private final EmployeeRepository employeeRepository;
    private final CompanyRepository companyRepository;
    private final EventEmployeeRepository eventEmployeeRepository;

    public EmployeeService(final EmployeeRepository employeeRepository,
            final CompanyRepository companyRepository,
            final EventEmployeeRepository eventEmployeeRepository) {
        this.employeeRepository = employeeRepository;
        this.companyRepository = companyRepository;
        this.eventEmployeeRepository = eventEmployeeRepository;
    }

    public List<EmployeeDTO> findAll() {
        final List<Employee> employees = employeeRepository.findAll(Sort.by("id"));
        return employees.stream()
                .map(employee -> mapToDTO(employee, new EmployeeDTO()))
                .toList();
    }

    public EmployeeDTO get(final UUID id) {
        return employeeRepository.findById(id)
                .map(employee -> mapToDTO(employee, new EmployeeDTO()))
                .orElseThrow(NotFoundException::new);
    }

    public UUID create(final EmployeeDTO employeeDTO) {
        final Employee employee = new Employee();
        mapToEntity(employeeDTO, employee);
        return employeeRepository.save(employee).getId();
    }

    public void update(final UUID id, final EmployeeDTO employeeDTO) {
        final Employee employee = employeeRepository.findById(id)
                .orElseThrow(NotFoundException::new);
        mapToEntity(employeeDTO, employee);
        employeeRepository.save(employee);
    }

    public void delete(final UUID id) {
        employeeRepository.deleteById(id);
    }

    private EmployeeDTO mapToDTO(final Employee employee, final EmployeeDTO employeeDTO) {
        employeeDTO.setId(employee.getId());
        employeeDTO.setName(employee.getName());
        employeeDTO.setCpfCnpj(employee.getCpfCnpj());
        employeeDTO.setDescription(employee.getDescription());
        employeeDTO.setCellPhone(employee.getCellPhone());
        employeeDTO.setPosition(employee.getPosition());
        employeeDTO.setIsApprentice(employee.getIsApprentice());
        employeeDTO.setCustomerId(employee.getCustomerId());
        employeeDTO.setAddress(employee.getAddress());
        employeeDTO.setCompany(employee.getCompany() == null ? null : employee.getCompany().getId());
        return employeeDTO;
    }

    private Employee mapToEntity(final EmployeeDTO employeeDTO, final Employee employee) {
        employee.setName(employeeDTO.getName());
        employee.setCpfCnpj(employeeDTO.getCpfCnpj());
        employee.setDescription(employeeDTO.getDescription());
        employee.setCellPhone(employeeDTO.getCellPhone());
        employee.setPosition(employeeDTO.getPosition());
        employee.setIsApprentice(employeeDTO.getIsApprentice());
        employee.setCustomerId(employeeDTO.getCustomerId());
        employee.setAddress(employeeDTO.getAddress());
        final Company company = employeeDTO.getCompany() == null ? null : companyRepository.findById(employeeDTO.getCompany())
                .orElseThrow(() -> new NotFoundException("company not found"));
        employee.setCompany(company);
        return employee;
    }

    public ReferencedWarning getReferencedWarning(final UUID id) {
        final ReferencedWarning referencedWarning = new ReferencedWarning();
        final Employee employee = employeeRepository.findById(id)
                .orElseThrow(NotFoundException::new);
        final EventEmployee employeeEventEmployee = eventEmployeeRepository.findFirstByEmployee(employee);
        if (employeeEventEmployee != null) {
            referencedWarning.setKey("employee.eventEmployee.employee.referenced");
            referencedWarning.addParam(employeeEventEmployee.getId());
            return referencedWarning;
        }
        return null;
    }

}
