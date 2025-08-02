package wastecnologia.wapps.api.service;

import java.util.List;
import java.util.UUID;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import wastecnologia.wapps.api.domain.Company;
import wastecnologia.wapps.api.domain.Equipament;
import wastecnologia.wapps.api.domain.EventEquipament;
import wastecnologia.wapps.api.model.EquipamentDTO;
import wastecnologia.wapps.api.repos.CompanyRepository;
import wastecnologia.wapps.api.repos.EquipamentRepository;
import wastecnologia.wapps.api.repos.EventEquipamentRepository;
import wastecnologia.wapps.api.util.NotFoundException;
import wastecnologia.wapps.api.util.ReferencedWarning;


@Service
public class EquipamentService {

    private final EquipamentRepository equipamentRepository;
    private final CompanyRepository companyRepository;
    private final EventEquipamentRepository eventEquipamentRepository;

    public EquipamentService(final EquipamentRepository equipamentRepository,
            final CompanyRepository companyRepository,
            final EventEquipamentRepository eventEquipamentRepository) {
        this.equipamentRepository = equipamentRepository;
        this.companyRepository = companyRepository;
        this.eventEquipamentRepository = eventEquipamentRepository;
    }

    public List<EquipamentDTO> findAll() {
        final List<Equipament> equipaments = equipamentRepository.findAll(Sort.by("id"));
        return equipaments.stream()
                .map(equipament -> mapToDTO(equipament, new EquipamentDTO()))
                .toList();
    }

    public EquipamentDTO get(final UUID id) {
        return equipamentRepository.findById(id)
                .map(equipament -> mapToDTO(equipament, new EquipamentDTO()))
                .orElseThrow(NotFoundException::new);
    }

    public UUID create(final EquipamentDTO equipamentDTO) {
        final Equipament equipament = new Equipament();
        mapToEntity(equipamentDTO, equipament);
        return equipamentRepository.save(equipament).getId();
    }

    public void update(final UUID id, final EquipamentDTO equipamentDTO) {
        final Equipament equipament = equipamentRepository.findById(id)
                .orElseThrow(NotFoundException::new);
        mapToEntity(equipamentDTO, equipament);
        equipamentRepository.save(equipament);
    }

    public void delete(final UUID id) {
        equipamentRepository.deleteById(id);
    }

    private EquipamentDTO mapToDTO(final Equipament equipament, final EquipamentDTO equipamentDTO) {
        equipamentDTO.setId(equipament.getId());
        equipamentDTO.setName(equipament.getName());
        equipamentDTO.setDescription(equipament.getDescription());
        equipamentDTO.setVoltage(equipament.getVoltage());
        equipamentDTO.setType(equipament.getType());
        equipamentDTO.setWeight(equipament.getWeight());
        equipamentDTO.setCustomerId(equipament.getCustomerId());
        equipamentDTO.setCompany(equipament.getCompany() == null ? null : equipament.getCompany().getId());
        return equipamentDTO;
    }

    private Equipament mapToEntity(final EquipamentDTO equipamentDTO, final Equipament equipament) {
        equipament.setName(equipamentDTO.getName());
        equipament.setDescription(equipamentDTO.getDescription());
        equipament.setVoltage(equipamentDTO.getVoltage());
        equipament.setType(equipamentDTO.getType());
        equipament.setWeight(equipamentDTO.getWeight());
        equipament.setCustomerId(equipamentDTO.getCustomerId());
        final Company company = equipamentDTO.getCompany() == null ? null : companyRepository.findById(equipamentDTO.getCompany())
                .orElseThrow(() -> new NotFoundException("company not found"));
        equipament.setCompany(company);
        return equipament;
    }

    public ReferencedWarning getReferencedWarning(final UUID id) {
        final ReferencedWarning referencedWarning = new ReferencedWarning();
        final Equipament equipament = equipamentRepository.findById(id)
                .orElseThrow(NotFoundException::new);
        final EventEquipament equipamentEventEquipament = eventEquipamentRepository.findFirstByEquipament(equipament);
        if (equipamentEventEquipament != null) {
            referencedWarning.setKey("equipament.eventEquipament.equipament.referenced");
            referencedWarning.addParam(equipamentEventEquipament.getId());
            return referencedWarning;
        }
        return null;
    }

}
