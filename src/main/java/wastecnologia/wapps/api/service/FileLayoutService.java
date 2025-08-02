package wastecnologia.wapps.api.service;

import java.util.List;
import java.util.UUID;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import wastecnologia.wapps.api.domain.FileControl;
import wastecnologia.wapps.api.domain.FileLayout;
import wastecnologia.wapps.api.model.FileLayoutDTO;
import wastecnologia.wapps.api.repos.FileControlRepository;
import wastecnologia.wapps.api.repos.FileLayoutRepository;
import wastecnologia.wapps.api.util.NotFoundException;
import wastecnologia.wapps.api.util.ReferencedWarning;


@Service
public class FileLayoutService {

    private final FileLayoutRepository fileLayoutRepository;
    private final FileControlRepository fileControlRepository;

    public FileLayoutService(final FileLayoutRepository fileLayoutRepository,
            final FileControlRepository fileControlRepository) {
        this.fileLayoutRepository = fileLayoutRepository;
        this.fileControlRepository = fileControlRepository;
    }

    public List<FileLayoutDTO> findAll() {
        final List<FileLayout> fileLayouts = fileLayoutRepository.findAll(Sort.by("id"));
        return fileLayouts.stream()
                .map(fileLayout -> mapToDTO(fileLayout, new FileLayoutDTO()))
                .toList();
    }

    public FileLayoutDTO get(final UUID id) {
        return fileLayoutRepository.findById(id)
                .map(fileLayout -> mapToDTO(fileLayout, new FileLayoutDTO()))
                .orElseThrow(NotFoundException::new);
    }

    public UUID create(final FileLayoutDTO fileLayoutDTO) {
        final FileLayout fileLayout = new FileLayout();
        mapToEntity(fileLayoutDTO, fileLayout);
        return fileLayoutRepository.save(fileLayout).getId();
    }

    public void update(final UUID id, final FileLayoutDTO fileLayoutDTO) {
        final FileLayout fileLayout = fileLayoutRepository.findById(id)
                .orElseThrow(NotFoundException::new);
        mapToEntity(fileLayoutDTO, fileLayout);
        fileLayoutRepository.save(fileLayout);
    }

    public void delete(final UUID id) {
        fileLayoutRepository.deleteById(id);
    }

    private FileLayoutDTO mapToDTO(final FileLayout fileLayout, final FileLayoutDTO fileLayoutDTO) {
        fileLayoutDTO.setId(fileLayout.getId());
        fileLayoutDTO.setLayoutName(fileLayout.getLayoutName());
        fileLayoutDTO.setLayoutSize(fileLayout.getLayoutSize());
        return fileLayoutDTO;
    }

    private FileLayout mapToEntity(final FileLayoutDTO fileLayoutDTO, final FileLayout fileLayout) {
        fileLayout.setLayoutName(fileLayoutDTO.getLayoutName());
        fileLayout.setLayoutSize(fileLayoutDTO.getLayoutSize());
        return fileLayout;
    }

    public ReferencedWarning getReferencedWarning(final UUID id) {
        final ReferencedWarning referencedWarning = new ReferencedWarning();
        final FileLayout fileLayout = fileLayoutRepository.findById(id)
                .orElseThrow(NotFoundException::new);
        final FileControl layoutFileControl = fileControlRepository.findFirstByLayout(fileLayout);
        if (layoutFileControl != null) {
            referencedWarning.setKey("fileLayout.fileControl.layout.referenced");
            referencedWarning.addParam(layoutFileControl.getId());
            return referencedWarning;
        }
        return null;
    }

}
