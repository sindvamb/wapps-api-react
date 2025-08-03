package wastecnologia.wapps.api.service;

import java.util.List;
import java.util.UUID;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import wastecnologia.wapps.api.domain.entity.Attachment;
import wastecnologia.wapps.api.domain.entity.Ticket;
import wastecnologia.wapps.api.domain.dto.AttachmentDTO;
import wastecnologia.wapps.api.repository.AttachmentRepository;
import wastecnologia.wapps.api.repository.TicketRepository;
import wastecnologia.wapps.api.util.NotFoundException;


@Service
public class AttachmentService {

    private final AttachmentRepository attachmentRepository;
    private final TicketRepository ticketRepository;

    public AttachmentService(final AttachmentRepository attachmentRepository,
            final TicketRepository ticketRepository) {
        this.attachmentRepository = attachmentRepository;
        this.ticketRepository = ticketRepository;
    }

    public List<AttachmentDTO> findAll() {
        final List<Attachment> attachments = attachmentRepository.findAll(Sort.by("id"));
        return attachments.stream()
                .map(attachment -> mapToDTO(attachment, new AttachmentDTO()))
                .toList();
    }

    public AttachmentDTO get(final UUID id) {
        return attachmentRepository.findById(id)
                .map(attachment -> mapToDTO(attachment, new AttachmentDTO()))
                .orElseThrow(NotFoundException::new);
    }

    public UUID create(final AttachmentDTO attachmentDTO) {
        final Attachment attachment = new Attachment();
        mapToEntity(attachmentDTO, attachment);
        return attachmentRepository.save(attachment).getId();
    }

    public void update(final UUID id, final AttachmentDTO attachmentDTO) {
        final Attachment attachment = attachmentRepository.findById(id)
                .orElseThrow(NotFoundException::new);
        mapToEntity(attachmentDTO, attachment);
        attachmentRepository.save(attachment);
    }

    public void delete(final UUID id) {
        attachmentRepository.deleteById(id);
    }

    private AttachmentDTO mapToDTO(final Attachment attachment, final AttachmentDTO attachmentDTO) {
        attachmentDTO.setId(attachment.getId());
        attachmentDTO.setSize(attachment.getSize());
        attachmentDTO.setName(attachment.getName());
        attachmentDTO.setContentType(attachment.getContentType());
        attachmentDTO.setIsPublic(attachment.getIsPublic());
        attachmentDTO.setDescription(attachment.getDescription());
        attachmentDTO.setPath(attachment.getPath());
        attachmentDTO.setAbsoluteUrl(attachment.getAbsoluteUrl());
        attachmentDTO.setInCloud(attachment.getInCloud());
        attachmentDTO.setFileData(attachment.getFileData());
        attachmentDTO.setTicket(attachment.getTicket() == null ? null : attachment.getTicket().getId());
        return attachmentDTO;
    }

    private Attachment mapToEntity(final AttachmentDTO attachmentDTO, final Attachment attachment) {
        attachment.setSize(attachmentDTO.getSize());
        attachment.setName(attachmentDTO.getName());
        attachment.setContentType(attachmentDTO.getContentType());
        attachment.setIsPublic(attachmentDTO.getIsPublic());
        attachment.setDescription(attachmentDTO.getDescription());
        attachment.setPath(attachmentDTO.getPath());
        attachment.setAbsoluteUrl(attachmentDTO.getAbsoluteUrl());
        attachment.setInCloud(attachmentDTO.getInCloud());
        attachment.setFileData(attachmentDTO.getFileData());
        final Ticket ticket = attachmentDTO.getTicket() == null ? null : ticketRepository.findById(attachmentDTO.getTicket())
                .orElseThrow(() -> new NotFoundException("ticket not found"));
        attachment.setTicket(ticket);
        return attachment;
    }

}
