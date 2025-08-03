package wastecnologia.wapps.api.service;

import java.util.List;
import java.util.UUID;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import wastecnologia.wapps.api.domain.entity.Address;
import wastecnologia.wapps.api.domain.entity.Company;
import wastecnologia.wapps.api.domain.entity.Contact;
import wastecnologia.wapps.api.domain.entity.User;
import wastecnologia.wapps.api.domain.dto.AddressDTO;
import wastecnologia.wapps.api.repository.AddressRepository;
import wastecnologia.wapps.api.repository.CompanyRepository;
import wastecnologia.wapps.api.repository.ContactRepository;
import wastecnologia.wapps.api.repository.UserRepository;
import wastecnologia.wapps.api.util.NotFoundException;
import wastecnologia.wapps.api.util.ReferencedWarning;


@Service
public class AddressService {

    private final AddressRepository addressRepository;
    private final CompanyRepository companyRepository;
    private final ContactRepository contactRepository;
    private final UserRepository userRepository;

    public AddressService(final AddressRepository addressRepository,
            final CompanyRepository companyRepository, final ContactRepository contactRepository,
            final UserRepository userRepository) {
        this.addressRepository = addressRepository;
        this.companyRepository = companyRepository;
        this.contactRepository = contactRepository;
        this.userRepository = userRepository;
    }

    public List<AddressDTO> findAll() {
        final List<Address> addresses = addressRepository.findAll(Sort.by("id"));
        return addresses.stream()
                .map(address -> mapToDTO(address, new AddressDTO()))
                .toList();
    }

    public AddressDTO get(final UUID id) {
        return addressRepository.findById(id)
                .map(address -> mapToDTO(address, new AddressDTO()))
                .orElseThrow(NotFoundException::new);
    }

    public UUID create(final AddressDTO addressDTO) {
        final Address address = new Address();
        mapToEntity(addressDTO, address);
        return addressRepository.save(address).getId();
    }

    public void update(final UUID id, final AddressDTO addressDTO) {
        final Address address = addressRepository.findById(id)
                .orElseThrow(NotFoundException::new);
        mapToEntity(addressDTO, address);
        addressRepository.save(address);
    }

    public void delete(final UUID id) {
        addressRepository.deleteById(id);
    }

    private AddressDTO mapToDTO(final Address address, final AddressDTO addressDTO) {
        addressDTO.setId(address.getId());
        addressDTO.setZipCode(address.getZipCode());
        addressDTO.setNeighborhood(address.getNeighborhood());
        addressDTO.setAddressLine1(address.getAddressLine1());
        addressDTO.setAddressLine2(address.getAddressLine2());
        addressDTO.setComplement(address.getComplement());
        addressDTO.setNumber(address.getNumber());
        addressDTO.setCity(address.getCity());
        addressDTO.setDistrict(address.getDistrict());
        addressDTO.setUf(address.getUf());
        addressDTO.setHousing(address.getHousing());
        return addressDTO;
    }

    private Address mapToEntity(final AddressDTO addressDTO, final Address address) {
        address.setZipCode(addressDTO.getZipCode());
        address.setNeighborhood(addressDTO.getNeighborhood());
        address.setAddressLine1(addressDTO.getAddressLine1());
        address.setAddressLine2(addressDTO.getAddressLine2());
        address.setComplement(addressDTO.getComplement());
        address.setNumber(addressDTO.getNumber());
        address.setCity(addressDTO.getCity());
        address.setDistrict(addressDTO.getDistrict());
        address.setUf(addressDTO.getUf());
        address.setHousing(addressDTO.getHousing());
        return address;
    }

    public ReferencedWarning getReferencedWarning(final UUID id) {
        final ReferencedWarning referencedWarning = new ReferencedWarning();
        final Address address = addressRepository.findById(id)
                .orElseThrow(NotFoundException::new);
        final Company addressCompany = companyRepository.findFirstByAddress(address);
        if (addressCompany != null) {
            referencedWarning.setKey("address.company.address.referenced");
            referencedWarning.addParam(addressCompany.getId());
            return referencedWarning;
        }
        final Contact addressContact = contactRepository.findFirstByAddress(address);
        if (addressContact != null) {
            referencedWarning.setKey("address.contact.address.referenced");
            referencedWarning.addParam(addressContact.getId());
            return referencedWarning;
        }
        final User addressUser = userRepository.findFirstByAddress(address);
        if (addressUser != null) {
            referencedWarning.setKey("address.user.address.referenced");
            referencedWarning.addParam(addressUser.getId());
            return referencedWarning;
        }
        return null;
    }

}
