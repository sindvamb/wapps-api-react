package wastecnologia.wapps.api.service;

import java.util.List;
import java.util.UUID;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import wastecnologia.wapps.api.domain.entity.Customer;
import wastecnologia.wapps.api.domain.entity.Order;
import wastecnologia.wapps.api.domain.entity.Partner;
import wastecnologia.wapps.api.domain.entity.PartnerUnit;
import wastecnologia.wapps.api.domain.entity.User;
import wastecnologia.wapps.api.domain.dto.PartnerUnitDTO;
import wastecnologia.wapps.api.repository.CustomerRepository;
import wastecnologia.wapps.api.repository.OrderRepository;
import wastecnologia.wapps.api.repository.PartnerRepository;
import wastecnologia.wapps.api.repository.PartnerUnitRepository;
import wastecnologia.wapps.api.repository.UserRepository;
import wastecnologia.wapps.api.util.NotFoundException;
import wastecnologia.wapps.api.util.ReferencedWarning;


@Service
public class PartnerUnitService {

    private final PartnerUnitRepository partnerUnitRepository;
    private final PartnerRepository partnerRepository;
    private final CustomerRepository customerRepository;
    private final OrderRepository orderRepository;
    private final UserRepository userRepository;

    public PartnerUnitService(final PartnerUnitRepository partnerUnitRepository,
            final PartnerRepository partnerRepository, final CustomerRepository customerRepository,
            final OrderRepository orderRepository, final UserRepository userRepository) {
        this.partnerUnitRepository = partnerUnitRepository;
        this.partnerRepository = partnerRepository;
        this.customerRepository = customerRepository;
        this.orderRepository = orderRepository;
        this.userRepository = userRepository;
    }

    public List<PartnerUnitDTO> findAll() {
        final List<PartnerUnit> partnerUnits = partnerUnitRepository.findAll(Sort.by("id"));
        return partnerUnits.stream()
                .map(partnerUnit -> mapToDTO(partnerUnit, new PartnerUnitDTO()))
                .toList();
    }

    public PartnerUnitDTO get(final UUID id) {
        return partnerUnitRepository.findById(id)
                .map(partnerUnit -> mapToDTO(partnerUnit, new PartnerUnitDTO()))
                .orElseThrow(NotFoundException::new);
    }

    public UUID create(final PartnerUnitDTO partnerUnitDTO) {
        final PartnerUnit partnerUnit = new PartnerUnit();
        mapToEntity(partnerUnitDTO, partnerUnit);
        return partnerUnitRepository.save(partnerUnit).getId();
    }

    public void update(final UUID id, final PartnerUnitDTO partnerUnitDTO) {
        final PartnerUnit partnerUnit = partnerUnitRepository.findById(id)
                .orElseThrow(NotFoundException::new);
        mapToEntity(partnerUnitDTO, partnerUnit);
        partnerUnitRepository.save(partnerUnit);
    }

    public void delete(final UUID id) {
        partnerUnitRepository.deleteById(id);
    }

    private PartnerUnitDTO mapToDTO(final PartnerUnit partnerUnit,
            final PartnerUnitDTO partnerUnitDTO) {
        partnerUnitDTO.setId(partnerUnit.getId());
        partnerUnitDTO.setName(partnerUnit.getName());
        partnerUnitDTO.setCpfCnpj(partnerUnit.getCpfCnpj());
        partnerUnitDTO.setEmail(partnerUnit.getEmail());
        partnerUnitDTO.setEnabled(partnerUnit.getEnabled());
        partnerUnitDTO.setCreatorId(partnerUnit.getCreatorId());
        partnerUnitDTO.setModifierId(partnerUnit.getModifierId());
        partnerUnitDTO.setDeleterId(partnerUnit.getDeleterId());
        partnerUnitDTO.setIsDeleted(partnerUnit.getIsDeleted());
        partnerUnitDTO.setCreatedAt(partnerUnit.getCreatedAt());
        partnerUnitDTO.setUpdatedAt(partnerUnit.getUpdatedAt());
        partnerUnitDTO.setDeletedAt(partnerUnit.getDeletedAt());
        partnerUnitDTO.setPartner(partnerUnit.getPartner() == null ? null : partnerUnit.getPartner().getId());
        return partnerUnitDTO;
    }

    private PartnerUnit mapToEntity(final PartnerUnitDTO partnerUnitDTO,
            final PartnerUnit partnerUnit) {
        partnerUnit.setName(partnerUnitDTO.getName());
        partnerUnit.setCpfCnpj(partnerUnitDTO.getCpfCnpj());
        partnerUnit.setEmail(partnerUnitDTO.getEmail());
        partnerUnit.setEnabled(partnerUnitDTO.getEnabled());
        partnerUnit.setCreatorId(partnerUnitDTO.getCreatorId());
        partnerUnit.setModifierId(partnerUnitDTO.getModifierId());
        partnerUnit.setDeleterId(partnerUnitDTO.getDeleterId());
        partnerUnit.setIsDeleted(partnerUnitDTO.getIsDeleted());
        partnerUnit.setCreatedAt(partnerUnitDTO.getCreatedAt());
        partnerUnit.setUpdatedAt(partnerUnitDTO.getUpdatedAt());
        partnerUnit.setDeletedAt(partnerUnitDTO.getDeletedAt());
        final Partner partner = partnerUnitDTO.getPartner() == null ? null : partnerRepository.findById(partnerUnitDTO.getPartner())
                .orElseThrow(() -> new NotFoundException("partner not found"));
        partnerUnit.setPartner(partner);
        return partnerUnit;
    }

    public ReferencedWarning getReferencedWarning(final UUID id) {
        final ReferencedWarning referencedWarning = new ReferencedWarning();
        final PartnerUnit partnerUnit = partnerUnitRepository.findById(id)
                .orElseThrow(NotFoundException::new);
        final Customer partnerUnitCustomer = customerRepository.findFirstByPartnerUnit(partnerUnit);
        if (partnerUnitCustomer != null) {
            referencedWarning.setKey("partnerUnit.customer.partnerUnit.referenced");
            referencedWarning.addParam(partnerUnitCustomer.getId());
            return referencedWarning;
        }
        final Order partnerUnitOrder = orderRepository.findFirstByPartnerUnit(partnerUnit);
        if (partnerUnitOrder != null) {
            referencedWarning.setKey("partnerUnit.order.partnerUnit.referenced");
            referencedWarning.addParam(partnerUnitOrder.getId());
            return referencedWarning;
        }
        final User partnerUnitUser = userRepository.findFirstByPartnerUnit(partnerUnit);
        if (partnerUnitUser != null) {
            referencedWarning.setKey("partnerUnit.user.partnerUnit.referenced");
            referencedWarning.addParam(partnerUnitUser.getId());
            return referencedWarning;
        }
        return null;
    }

}
