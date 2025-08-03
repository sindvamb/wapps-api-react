package wastecnologia.wapps.api.service;

import java.util.List;
import java.util.UUID;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import wastecnologia.wapps.api.domain.entity.Order;
import wastecnologia.wapps.api.domain.entity.ProductArea;
import wastecnologia.wapps.api.domain.dto.ProductAreaDTO;
import wastecnologia.wapps.api.repository.OrderRepository;
import wastecnologia.wapps.api.repository.ProductAreaRepository;
import wastecnologia.wapps.api.util.NotFoundException;
import wastecnologia.wapps.api.util.ReferencedWarning;


@Service
public class ProductAreaService {

    private final ProductAreaRepository productAreaRepository;
    private final OrderRepository orderRepository;

    public ProductAreaService(final ProductAreaRepository productAreaRepository,
            final OrderRepository orderRepository) {
        this.productAreaRepository = productAreaRepository;
        this.orderRepository = orderRepository;
    }

    public List<ProductAreaDTO> findAll() {
        final List<ProductArea> productAreas = productAreaRepository.findAll(Sort.by("id"));
        return productAreas.stream()
                .map(productArea -> mapToDTO(productArea, new ProductAreaDTO()))
                .toList();
    }

    public ProductAreaDTO get(final UUID id) {
        return productAreaRepository.findById(id)
                .map(productArea -> mapToDTO(productArea, new ProductAreaDTO()))
                .orElseThrow(NotFoundException::new);
    }

    public UUID create(final ProductAreaDTO productAreaDTO) {
        final ProductArea productArea = new ProductArea();
        mapToEntity(productAreaDTO, productArea);
        return productAreaRepository.save(productArea).getId();
    }

    public void update(final UUID id, final ProductAreaDTO productAreaDTO) {
        final ProductArea productArea = productAreaRepository.findById(id)
                .orElseThrow(NotFoundException::new);
        mapToEntity(productAreaDTO, productArea);
        productAreaRepository.save(productArea);
    }

    public void delete(final UUID id) {
        productAreaRepository.deleteById(id);
    }

    private ProductAreaDTO mapToDTO(final ProductArea productArea,
            final ProductAreaDTO productAreaDTO) {
        productAreaDTO.setId(productArea.getId());
        productAreaDTO.setCode(productArea.getCode());
        productAreaDTO.setDescription(productArea.getDescription());
        return productAreaDTO;
    }

    private ProductArea mapToEntity(final ProductAreaDTO productAreaDTO,
            final ProductArea productArea) {
        productArea.setCode(productAreaDTO.getCode());
        productArea.setDescription(productAreaDTO.getDescription());
        return productArea;
    }

    public ReferencedWarning getReferencedWarning(final UUID id) {
        final ReferencedWarning referencedWarning = new ReferencedWarning();
        final ProductArea productArea = productAreaRepository.findById(id)
                .orElseThrow(NotFoundException::new);
        final Order productAreaOrder = orderRepository.findFirstByProductArea(productArea);
        if (productAreaOrder != null) {
            referencedWarning.setKey("productArea.order.productArea.referenced");
            referencedWarning.addParam(productAreaOrder.getId());
            return referencedWarning;
        }
        return null;
    }

}
