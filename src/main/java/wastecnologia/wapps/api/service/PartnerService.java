package wastecnologia.wapps.api.service;

import java.util.List;
import java.util.UUID;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import wastecnologia.wapps.api.domain.entity.Partner;
import wastecnologia.wapps.api.domain.entity.PartnerUnit;
import wastecnologia.wapps.api.domain.dto.PartnerDTO;
import wastecnologia.wapps.api.repository.PartnerRepository;
import wastecnologia.wapps.api.repository.PartnerUnitRepository;
import wastecnologia.wapps.api.util.NotFoundException;
import wastecnologia.wapps.api.util.ReferencedWarning;


@Service
public class PartnerService {

    private final PartnerRepository partnerRepository;
    private final PartnerUnitRepository partnerUnitRepository;

    public PartnerService(final PartnerRepository partnerRepository,
            final PartnerUnitRepository partnerUnitRepository) {
        this.partnerRepository = partnerRepository;
        this.partnerUnitRepository = partnerUnitRepository;
    }

    public List<PartnerDTO> findAll() {
        final List<Partner> partners = partnerRepository.findAll(Sort.by("id"));
        return partners.stream()
                .map(partner -> mapToDTO(partner, new PartnerDTO()))
                .toList();
    }

    public PartnerDTO get(final UUID id) {
        return partnerRepository.findById(id)
                .map(partner -> mapToDTO(partner, new PartnerDTO()))
                .orElseThrow(NotFoundException::new);
    }

    public UUID create(final PartnerDTO partnerDTO) {
        final Partner partner = new Partner();
        mapToEntity(partnerDTO, partner);
        return partnerRepository.save(partner).getId();
    }

    public void update(final UUID id, final PartnerDTO partnerDTO) {
        final Partner partner = partnerRepository.findById(id)
                .orElseThrow(NotFoundException::new);
        mapToEntity(partnerDTO, partner);
        partnerRepository.save(partner);
    }

    public void delete(final UUID id) {
        partnerRepository.deleteById(id);
    }

    private PartnerDTO mapToDTO(final Partner partner, final PartnerDTO partnerDTO) {
        partnerDTO.setId(partner.getId());
        partnerDTO.setName(partner.getName());
        partnerDTO.setCpfCnpj(partner.getCpfCnpj());
        partnerDTO.setEmail(partner.getEmail());
        partnerDTO.setEnabled(partner.getEnabled());
        partnerDTO.setCreatorId(partner.getCreatorId());
        partnerDTO.setModifierId(partner.getModifierId());
        partnerDTO.setDeleterId(partner.getDeleterId());
        partnerDTO.setIsDeleted(partner.getIsDeleted());
        partnerDTO.setCreatedAt(partner.getCreatedAt());
        partnerDTO.setUpdatedAt(partner.getUpdatedAt());
        partnerDTO.setDeletedAt(partner.getDeletedAt());
        return partnerDTO;
    }

    private Partner mapToEntity(final PartnerDTO partnerDTO, final Partner partner) {
        partner.setName(partnerDTO.getName());
        partner.setCpfCnpj(partnerDTO.getCpfCnpj());
        partner.setEmail(partnerDTO.getEmail());
        partner.setEnabled(partnerDTO.getEnabled());
        partner.setCreatorId(partnerDTO.getCreatorId());
        partner.setModifierId(partnerDTO.getModifierId());
        partner.setDeleterId(partnerDTO.getDeleterId());
        partner.setIsDeleted(partnerDTO.getIsDeleted());
        partner.setCreatedAt(partnerDTO.getCreatedAt());
        partner.setUpdatedAt(partnerDTO.getUpdatedAt());
        partner.setDeletedAt(partnerDTO.getDeletedAt());
        return partner;
    }

    public ReferencedWarning getReferencedWarning(final UUID id) {
        final ReferencedWarning referencedWarning = new ReferencedWarning();
        final Partner partner = partnerRepository.findById(id)
                .orElseThrow(NotFoundException::new);
        final PartnerUnit partnerPartnerUnit = partnerUnitRepository.findFirstByPartner(partner);
        if (partnerPartnerUnit != null) {
            referencedWarning.setKey("partner.partnerUnit.partner.referenced");
            referencedWarning.addParam(partnerPartnerUnit.getId());
            return referencedWarning;
        }
        return null;
    }

}
