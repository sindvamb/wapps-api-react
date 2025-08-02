package wastecnologia.wapps.api.service;

import java.util.List;
import java.util.UUID;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import wastecnologia.wapps.api.domain.Order;
import wastecnologia.wapps.api.domain.ProductCategory;
import wastecnologia.wapps.api.model.ProductCategoryDTO;
import wastecnologia.wapps.api.repos.OrderRepository;
import wastecnologia.wapps.api.repos.ProductCategoryRepository;
import wastecnologia.wapps.api.util.NotFoundException;
import wastecnologia.wapps.api.util.ReferencedWarning;


@Service
public class ProductCategoryService {

    private final ProductCategoryRepository productCategoryRepository;
    private final OrderRepository orderRepository;

    public ProductCategoryService(final ProductCategoryRepository productCategoryRepository,
            final OrderRepository orderRepository) {
        this.productCategoryRepository = productCategoryRepository;
        this.orderRepository = orderRepository;
    }

    public List<ProductCategoryDTO> findAll() {
        final List<ProductCategory> productCategories = productCategoryRepository.findAll(Sort.by("id"));
        return productCategories.stream()
                .map(productCategory -> mapToDTO(productCategory, new ProductCategoryDTO()))
                .toList();
    }

    public ProductCategoryDTO get(final UUID id) {
        return productCategoryRepository.findById(id)
                .map(productCategory -> mapToDTO(productCategory, new ProductCategoryDTO()))
                .orElseThrow(NotFoundException::new);
    }

    public UUID create(final ProductCategoryDTO productCategoryDTO) {
        final ProductCategory productCategory = new ProductCategory();
        mapToEntity(productCategoryDTO, productCategory);
        return productCategoryRepository.save(productCategory).getId();
    }

    public void update(final UUID id, final ProductCategoryDTO productCategoryDTO) {
        final ProductCategory productCategory = productCategoryRepository.findById(id)
                .orElseThrow(NotFoundException::new);
        mapToEntity(productCategoryDTO, productCategory);
        productCategoryRepository.save(productCategory);
    }

    public void delete(final UUID id) {
        productCategoryRepository.deleteById(id);
    }

    private ProductCategoryDTO mapToDTO(final ProductCategory productCategory,
            final ProductCategoryDTO productCategoryDTO) {
        productCategoryDTO.setId(productCategory.getId());
        productCategoryDTO.setCode(productCategory.getCode());
        productCategoryDTO.setDescription(productCategory.getDescription());
        return productCategoryDTO;
    }

    private ProductCategory mapToEntity(final ProductCategoryDTO productCategoryDTO,
            final ProductCategory productCategory) {
        productCategory.setCode(productCategoryDTO.getCode());
        productCategory.setDescription(productCategoryDTO.getDescription());
        return productCategory;
    }

    public ReferencedWarning getReferencedWarning(final UUID id) {
        final ReferencedWarning referencedWarning = new ReferencedWarning();
        final ProductCategory productCategory = productCategoryRepository.findById(id)
                .orElseThrow(NotFoundException::new);
        final Order productCategoryOrder = orderRepository.findFirstByProductCategory(productCategory);
        if (productCategoryOrder != null) {
            referencedWarning.setKey("productCategory.order.productCategory.referenced");
            referencedWarning.addParam(productCategoryOrder.getId());
            return referencedWarning;
        }
        return null;
    }

}
