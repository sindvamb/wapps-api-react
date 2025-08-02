package wastecnologia.wapps.api.service;

import java.util.List;
import java.util.UUID;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import wastecnologia.wapps.api.domain.EducationDegree;
import wastecnologia.wapps.api.domain.User;
import wastecnologia.wapps.api.model.EducationDegreeDTO;
import wastecnologia.wapps.api.repos.EducationDegreeRepository;
import wastecnologia.wapps.api.repos.UserRepository;
import wastecnologia.wapps.api.util.NotFoundException;
import wastecnologia.wapps.api.util.ReferencedWarning;


@Service
public class EducationDegreeService {

    private final EducationDegreeRepository educationDegreeRepository;
    private final UserRepository userRepository;

    public EducationDegreeService(final EducationDegreeRepository educationDegreeRepository,
            final UserRepository userRepository) {
        this.educationDegreeRepository = educationDegreeRepository;
        this.userRepository = userRepository;
    }

    public List<EducationDegreeDTO> findAll() {
        final List<EducationDegree> educationDegrees = educationDegreeRepository.findAll(Sort.by("id"));
        return educationDegrees.stream()
                .map(educationDegree -> mapToDTO(educationDegree, new EducationDegreeDTO()))
                .toList();
    }

    public EducationDegreeDTO get(final UUID id) {
        return educationDegreeRepository.findById(id)
                .map(educationDegree -> mapToDTO(educationDegree, new EducationDegreeDTO()))
                .orElseThrow(NotFoundException::new);
    }

    public UUID create(final EducationDegreeDTO educationDegreeDTO) {
        final EducationDegree educationDegree = new EducationDegree();
        mapToEntity(educationDegreeDTO, educationDegree);
        return educationDegreeRepository.save(educationDegree).getId();
    }

    public void update(final UUID id, final EducationDegreeDTO educationDegreeDTO) {
        final EducationDegree educationDegree = educationDegreeRepository.findById(id)
                .orElseThrow(NotFoundException::new);
        mapToEntity(educationDegreeDTO, educationDegree);
        educationDegreeRepository.save(educationDegree);
    }

    public void delete(final UUID id) {
        educationDegreeRepository.deleteById(id);
    }

    private EducationDegreeDTO mapToDTO(final EducationDegree educationDegree,
            final EducationDegreeDTO educationDegreeDTO) {
        educationDegreeDTO.setId(educationDegree.getId());
        educationDegreeDTO.setCode(educationDegree.getCode());
        educationDegreeDTO.setDescription(educationDegree.getDescription());
        return educationDegreeDTO;
    }

    private EducationDegree mapToEntity(final EducationDegreeDTO educationDegreeDTO,
            final EducationDegree educationDegree) {
        educationDegree.setCode(educationDegreeDTO.getCode());
        educationDegree.setDescription(educationDegreeDTO.getDescription());
        return educationDegree;
    }

    public ReferencedWarning getReferencedWarning(final UUID id) {
        final ReferencedWarning referencedWarning = new ReferencedWarning();
        final EducationDegree educationDegree = educationDegreeRepository.findById(id)
                .orElseThrow(NotFoundException::new);
        final User educationDegreeUser = userRepository.findFirstByEducationDegree(educationDegree);
        if (educationDegreeUser != null) {
            referencedWarning.setKey("educationDegree.user.educationDegree.referenced");
            referencedWarning.addParam(educationDegreeUser.getId());
            return referencedWarning;
        }
        return null;
    }

}
