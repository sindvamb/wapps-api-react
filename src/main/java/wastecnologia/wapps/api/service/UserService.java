package wastecnologia.wapps.api.service;

import java.util.List;
import java.util.UUID;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import wastecnologia.wapps.api.domain.entity.Address;
import wastecnologia.wapps.api.domain.entity.Audit;
import wastecnologia.wapps.api.domain.entity.Customer;
import wastecnologia.wapps.api.domain.entity.EducationDegree;
import wastecnologia.wapps.api.domain.entity.FileControl;
import wastecnologia.wapps.api.domain.entity.LoginHistory;
import wastecnologia.wapps.api.domain.entity.PartnerUnit;
import wastecnologia.wapps.api.domain.entity.PasswordHistory;
import wastecnologia.wapps.api.domain.entity.RegistrationRequest;
import wastecnologia.wapps.api.domain.entity.Role;
import wastecnologia.wapps.api.domain.entity.SpecialNeeds;
import wastecnologia.wapps.api.domain.entity.User;
import wastecnologia.wapps.api.domain.entity.UserStatus;
import wastecnologia.wapps.api.domain.dto.UserDTO;
import wastecnologia.wapps.api.repository.AddressRepository;
import wastecnologia.wapps.api.repository.AuditRepository;
import wastecnologia.wapps.api.repository.CustomerRepository;
import wastecnologia.wapps.api.repository.EducationDegreeRepository;
import wastecnologia.wapps.api.repository.FileControlRepository;
import wastecnologia.wapps.api.repository.LoginHistoryRepository;
import wastecnologia.wapps.api.repository.PartnerUnitRepository;
import wastecnologia.wapps.api.repository.PasswordHistoryRepository;
import wastecnologia.wapps.api.repository.RegistrationRequestRepository;
import wastecnologia.wapps.api.repository.RoleRepository;
import wastecnologia.wapps.api.repository.SpecialNeedsRepository;
import wastecnologia.wapps.api.repository.UserRepository;
import wastecnologia.wapps.api.repository.UserStatusRepository;
import wastecnologia.wapps.api.util.NotFoundException;
import wastecnologia.wapps.api.util.ReferencedWarning;


@Service
public class UserService {

    private final UserRepository userRepository;
    private final AddressRepository addressRepository;
    private final EducationDegreeRepository educationDegreeRepository;
    private final PartnerUnitRepository partnerUnitRepository;
    private final RoleRepository roleRepository;
    private final UserStatusRepository userStatusRepository;
    private final AuditRepository auditRepository;
    private final CustomerRepository customerRepository;
    private final FileControlRepository fileControlRepository;
    private final LoginHistoryRepository loginHistoryRepository;
    private final PasswordHistoryRepository passwordHistoryRepository;
    private final RegistrationRequestRepository registrationRequestRepository;
    private final SpecialNeedsRepository specialNeedsRepository;

    public UserService(final UserRepository userRepository,
            final AddressRepository addressRepository,
            final EducationDegreeRepository educationDegreeRepository,
            final PartnerUnitRepository partnerUnitRepository, final RoleRepository roleRepository,
            final UserStatusRepository userStatusRepository, final AuditRepository auditRepository,
            final CustomerRepository customerRepository,
            final FileControlRepository fileControlRepository,
            final LoginHistoryRepository loginHistoryRepository,
            final PasswordHistoryRepository passwordHistoryRepository,
            final RegistrationRequestRepository registrationRequestRepository,
            final SpecialNeedsRepository specialNeedsRepository) {
        this.userRepository = userRepository;
        this.addressRepository = addressRepository;
        this.educationDegreeRepository = educationDegreeRepository;
        this.partnerUnitRepository = partnerUnitRepository;
        this.roleRepository = roleRepository;
        this.userStatusRepository = userStatusRepository;
        this.auditRepository = auditRepository;
        this.customerRepository = customerRepository;
        this.fileControlRepository = fileControlRepository;
        this.loginHistoryRepository = loginHistoryRepository;
        this.passwordHistoryRepository = passwordHistoryRepository;
        this.registrationRequestRepository = registrationRequestRepository;
        this.specialNeedsRepository = specialNeedsRepository;
    }

    public List<UserDTO> findAll() {
        final List<User> users = userRepository.findAll(Sort.by("id"));
        return users.stream()
                .map(user -> mapToDTO(user, new UserDTO()))
                .toList();
    }

    public UserDTO get(final UUID id) {
        return userRepository.findById(id)
                .map(user -> mapToDTO(user, new UserDTO()))
                .orElseThrow(NotFoundException::new);
    }

    public UUID create(final UserDTO userDTO) {
        final User user = new User();
        mapToEntity(userDTO, user);
        return userRepository.save(user).getId();
    }

    public void update(final UUID id, final UserDTO userDTO) {
        final User user = userRepository.findById(id)
                .orElseThrow(NotFoundException::new);
        mapToEntity(userDTO, user);
        userRepository.save(user);
    }

    public void delete(final UUID id) {
        userRepository.deleteById(id);
    }

    private UserDTO mapToDTO(final User user, final UserDTO userDTO) {
        userDTO.setId(user.getId());
        userDTO.setMatricula(user.getMatricula());
        userDTO.setName(user.getName());
        userDTO.setSocialName(user.getSocialName());
        userDTO.setSurname(user.getSurname());
        userDTO.setGender(user.getGender());
        userDTO.setBirthplace(user.getBirthplace());
        userDTO.setCivilStatus(user.getCivilStatus());
        userDTO.setFatherName(user.getFatherName());
        userDTO.setMotherName(user.getMotherName());
        userDTO.setNationality(user.getNationality());
        userDTO.setRg(user.getRg());
        userDTO.setUfIssuingBody(user.getUfIssuingBody());
        userDTO.setCpfCnpj(user.getCpfCnpj());
        userDTO.setEmail(user.getEmail());
        userDTO.setPassword(user.getPassword());
        userDTO.setRace(user.getRace());
        userDTO.setProfession(user.getProfession());
        userDTO.setCellPhone(user.getCellPhone());
        userDTO.setHomePhone(user.getHomePhone());
        userDTO.setBusinessPhone(user.getBusinessPhone());
        userDTO.setHasSpecialNeeds(user.getHasSpecialNeeds());
        userDTO.setSpecialNeedsOther(user.getSpecialNeedsOther());
        userDTO.setIsSystem(user.getIsSystem());
        userDTO.setIsCustomer(user.getIsCustomer());
        userDTO.setSecurelyPhrase(user.getSecurelyPhrase());
        userDTO.setLoginAttemps(user.getLoginAttemps());
        userDTO.setPasswordPolicyEnabled(user.getPasswordPolicyEnabled());
        userDTO.setBirthdate(user.getBirthdate());
        userDTO.setLastLoginAt(user.getLastLoginAt());
        userDTO.setLastPasswordChangedAt(user.getLastPasswordChangedAt());
        userDTO.setPasswordResetToken(user.getPasswordResetToken());
        userDTO.setCreatorId(user.getCreatorId());
        userDTO.setModifierId(user.getModifierId());
        userDTO.setDeleterId(user.getDeleterId());
        userDTO.setIsDeleted(user.getIsDeleted());
        userDTO.setCreatedAt(user.getCreatedAt());
        userDTO.setUpdatedAt(user.getUpdatedAt());
        userDTO.setDeletedAt(user.getDeletedAt());
        userDTO.setAddress(user.getAddress() == null ? null : user.getAddress().getId());
        userDTO.setEducationDegree(user.getEducationDegree() == null ? null : user.getEducationDegree().getId());
        userDTO.setPartnerUnit(user.getPartnerUnit() == null ? null : user.getPartnerUnit().getId());
        userDTO.setRole(user.getRole() == null ? null : user.getRole().getId());
        userDTO.setUserStatus(user.getUserStatus() == null ? null : user.getUserStatus().getId());
        return userDTO;
    }

    private User mapToEntity(final UserDTO userDTO, final User user) {
        user.setMatricula(userDTO.getMatricula());
        user.setName(userDTO.getName());
        user.setSocialName(userDTO.getSocialName());
        user.setSurname(userDTO.getSurname());
        user.setGender(userDTO.getGender());
        user.setBirthplace(userDTO.getBirthplace());
        user.setCivilStatus(userDTO.getCivilStatus());
        user.setFatherName(userDTO.getFatherName());
        user.setMotherName(userDTO.getMotherName());
        user.setNationality(userDTO.getNationality());
        user.setRg(userDTO.getRg());
        user.setUfIssuingBody(userDTO.getUfIssuingBody());
        user.setCpfCnpj(userDTO.getCpfCnpj());
        user.setEmail(userDTO.getEmail());
        user.setPassword(userDTO.getPassword());
        user.setRace(userDTO.getRace());
        user.setProfession(userDTO.getProfession());
        user.setCellPhone(userDTO.getCellPhone());
        user.setHomePhone(userDTO.getHomePhone());
        user.setBusinessPhone(userDTO.getBusinessPhone());
        user.setHasSpecialNeeds(userDTO.getHasSpecialNeeds());
        user.setSpecialNeedsOther(userDTO.getSpecialNeedsOther());
        user.setIsSystem(userDTO.getIsSystem());
        user.setIsCustomer(userDTO.getIsCustomer());
        user.setSecurelyPhrase(userDTO.getSecurelyPhrase());
        user.setLoginAttemps(userDTO.getLoginAttemps());
        user.setPasswordPolicyEnabled(userDTO.getPasswordPolicyEnabled());
        user.setBirthdate(userDTO.getBirthdate());
        user.setLastLoginAt(userDTO.getLastLoginAt());
        user.setLastPasswordChangedAt(userDTO.getLastPasswordChangedAt());
        user.setPasswordResetToken(userDTO.getPasswordResetToken());
        user.setCreatorId(userDTO.getCreatorId());
        user.setModifierId(userDTO.getModifierId());
        user.setDeleterId(userDTO.getDeleterId());
        user.setIsDeleted(userDTO.getIsDeleted());
        user.setCreatedAt(userDTO.getCreatedAt());
        user.setUpdatedAt(userDTO.getUpdatedAt());
        user.setDeletedAt(userDTO.getDeletedAt());
        final Address address = userDTO.getAddress() == null ? null : addressRepository.findById(userDTO.getAddress())
                .orElseThrow(() -> new NotFoundException("address not found"));
        user.setAddress(address);
        final EducationDegree educationDegree = userDTO.getEducationDegree() == null ? null : educationDegreeRepository.findById(userDTO.getEducationDegree())
                .orElseThrow(() -> new NotFoundException("educationDegree not found"));
        user.setEducationDegree(educationDegree);
        final PartnerUnit partnerUnit = userDTO.getPartnerUnit() == null ? null : partnerUnitRepository.findById(userDTO.getPartnerUnit())
                .orElseThrow(() -> new NotFoundException("partnerUnit not found"));
        user.setPartnerUnit(partnerUnit);
        final Role role = userDTO.getRole() == null ? null : roleRepository.findById(userDTO.getRole())
                .orElseThrow(() -> new NotFoundException("role not found"));
        user.setRole(role);
        final UserStatus userStatus = userDTO.getUserStatus() == null ? null : userStatusRepository.findById(userDTO.getUserStatus())
                .orElseThrow(() -> new NotFoundException("userStatus not found"));
        user.setUserStatus(userStatus);
        return user;
    }

    public ReferencedWarning getReferencedWarning(final UUID id) {
        final ReferencedWarning referencedWarning = new ReferencedWarning();
        final User user = userRepository.findById(id)
                .orElseThrow(NotFoundException::new);
        final Audit userAudit = auditRepository.findFirstByUser(user);
        if (userAudit != null) {
            referencedWarning.setKey("user.audit.user.referenced");
            referencedWarning.addParam(userAudit.getId());
            return referencedWarning;
        }
        final Customer userCustomer = customerRepository.findFirstByUser(user);
        if (userCustomer != null) {
            referencedWarning.setKey("user.customer.user.referenced");
            referencedWarning.addParam(userCustomer.getId());
            return referencedWarning;
        }
        final FileControl userFileControl = fileControlRepository.findFirstByUser(user);
        if (userFileControl != null) {
            referencedWarning.setKey("user.fileControl.user.referenced");
            referencedWarning.addParam(userFileControl.getId());
            return referencedWarning;
        }
        final LoginHistory userLoginHistory = loginHistoryRepository.findFirstByUser(user);
        if (userLoginHistory != null) {
            referencedWarning.setKey("user.loginHistory.user.referenced");
            referencedWarning.addParam(userLoginHistory.getId());
            return referencedWarning;
        }
        final PasswordHistory userPasswordHistory = passwordHistoryRepository.findFirstByUser(user);
        if (userPasswordHistory != null) {
            referencedWarning.setKey("user.passwordHistory.user.referenced");
            referencedWarning.addParam(userPasswordHistory.getId());
            return referencedWarning;
        }
        final RegistrationRequest userRegistrationRequest = registrationRequestRepository.findFirstByUser(user);
        if (userRegistrationRequest != null) {
            referencedWarning.setKey("user.registrationRequest.user.referenced");
            referencedWarning.addParam(userRegistrationRequest.getId());
            return referencedWarning;
        }
        final SpecialNeeds userSpecialNeeds = specialNeedsRepository.findFirstByUser(user);
        if (userSpecialNeeds != null) {
            referencedWarning.setKey("user.specialNeeds.user.referenced");
            referencedWarning.addParam(userSpecialNeeds.getId());
            return referencedWarning;
        }
        return null;
    }

}
