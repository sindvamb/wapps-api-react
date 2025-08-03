package wastecnologia.wapps.api.service;

import java.util.List;
import java.util.UUID;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import wastecnologia.wapps.api.domain.entity.SpecialNeeds;
import wastecnologia.wapps.api.domain.entity.User;
import wastecnologia.wapps.api.domain.dto.SpecialNeedsDTO;
import wastecnologia.wapps.api.repository.SpecialNeedsRepository;
import wastecnologia.wapps.api.repository.UserRepository;
import wastecnologia.wapps.api.util.NotFoundException;


@Service
public class SpecialNeedsService {

    private final SpecialNeedsRepository specialNeedsRepository;
    private final UserRepository userRepository;

    public SpecialNeedsService(final SpecialNeedsRepository specialNeedsRepository,
            final UserRepository userRepository) {
        this.specialNeedsRepository = specialNeedsRepository;
        this.userRepository = userRepository;
    }

    public List<SpecialNeedsDTO> findAll() {
        final List<SpecialNeeds> specialNeedses = specialNeedsRepository.findAll(Sort.by("id"));
        return specialNeedses.stream()
                .map(specialNeeds -> mapToDTO(specialNeeds, new SpecialNeedsDTO()))
                .toList();
    }

    public SpecialNeedsDTO get(final UUID id) {
        return specialNeedsRepository.findById(id)
                .map(specialNeeds -> mapToDTO(specialNeeds, new SpecialNeedsDTO()))
                .orElseThrow(NotFoundException::new);
    }

    public UUID create(final SpecialNeedsDTO specialNeedsDTO) {
        final SpecialNeeds specialNeeds = new SpecialNeeds();
        mapToEntity(specialNeedsDTO, specialNeeds);
        return specialNeedsRepository.save(specialNeeds).getId();
    }

    public void update(final UUID id, final SpecialNeedsDTO specialNeedsDTO) {
        final SpecialNeeds specialNeeds = specialNeedsRepository.findById(id)
                .orElseThrow(NotFoundException::new);
        mapToEntity(specialNeedsDTO, specialNeeds);
        specialNeedsRepository.save(specialNeeds);
    }

    public void delete(final UUID id) {
        specialNeedsRepository.deleteById(id);
    }

    private SpecialNeedsDTO mapToDTO(final SpecialNeeds specialNeeds,
            final SpecialNeedsDTO specialNeedsDTO) {
        specialNeedsDTO.setId(specialNeeds.getId());
        specialNeedsDTO.setDescription(specialNeeds.getDescription());
        specialNeedsDTO.setUser(specialNeeds.getUser() == null ? null : specialNeeds.getUser().getId());
        return specialNeedsDTO;
    }

    private SpecialNeeds mapToEntity(final SpecialNeedsDTO specialNeedsDTO,
            final SpecialNeeds specialNeeds) {
        specialNeeds.setDescription(specialNeedsDTO.getDescription());
        final User user = specialNeedsDTO.getUser() == null ? null : userRepository.findById(specialNeedsDTO.getUser())
                .orElseThrow(() -> new NotFoundException("user not found"));
        specialNeeds.setUser(user);
        return specialNeeds;
    }

}
