package wastecnologia.wapps.api.service;

import java.util.List;
import java.util.UUID;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import wastecnologia.wapps.api.domain.entity.Order;
import wastecnologia.wapps.api.domain.entity.OrderType;
import wastecnologia.wapps.api.domain.dto.OrderTypeDTO;
import wastecnologia.wapps.api.repository.OrderRepository;
import wastecnologia.wapps.api.repository.OrderTypeRepository;
import wastecnologia.wapps.api.util.NotFoundException;
import wastecnologia.wapps.api.util.ReferencedWarning;


@Service
public class OrderTypeService {

    private final OrderTypeRepository orderTypeRepository;
    private final OrderRepository orderRepository;

    public OrderTypeService(final OrderTypeRepository orderTypeRepository,
            final OrderRepository orderRepository) {
        this.orderTypeRepository = orderTypeRepository;
        this.orderRepository = orderRepository;
    }

    public List<OrderTypeDTO> findAll() {
        final List<OrderType> orderTypes = orderTypeRepository.findAll(Sort.by("id"));
        return orderTypes.stream()
                .map(orderType -> mapToDTO(orderType, new OrderTypeDTO()))
                .toList();
    }

    public OrderTypeDTO get(final UUID id) {
        return orderTypeRepository.findById(id)
                .map(orderType -> mapToDTO(orderType, new OrderTypeDTO()))
                .orElseThrow(NotFoundException::new);
    }

    public UUID create(final OrderTypeDTO orderTypeDTO) {
        final OrderType orderType = new OrderType();
        mapToEntity(orderTypeDTO, orderType);
        return orderTypeRepository.save(orderType).getId();
    }

    public void update(final UUID id, final OrderTypeDTO orderTypeDTO) {
        final OrderType orderType = orderTypeRepository.findById(id)
                .orElseThrow(NotFoundException::new);
        mapToEntity(orderTypeDTO, orderType);
        orderTypeRepository.save(orderType);
    }

    public void delete(final UUID id) {
        orderTypeRepository.deleteById(id);
    }

    private OrderTypeDTO mapToDTO(final OrderType orderType, final OrderTypeDTO orderTypeDTO) {
        orderTypeDTO.setId(orderType.getId());
        orderTypeDTO.setCode(orderType.getCode());
        orderTypeDTO.setDescription(orderType.getDescription());
        return orderTypeDTO;
    }

    private OrderType mapToEntity(final OrderTypeDTO orderTypeDTO, final OrderType orderType) {
        orderType.setCode(orderTypeDTO.getCode());
        orderType.setDescription(orderTypeDTO.getDescription());
        return orderType;
    }

    public ReferencedWarning getReferencedWarning(final UUID id) {
        final ReferencedWarning referencedWarning = new ReferencedWarning();
        final OrderType orderType = orderTypeRepository.findById(id)
                .orElseThrow(NotFoundException::new);
        final Order orderTypeOrder = orderRepository.findFirstByOrderType(orderType);
        if (orderTypeOrder != null) {
            referencedWarning.setKey("orderType.order.orderType.referenced");
            referencedWarning.addParam(orderTypeOrder.getId());
            return referencedWarning;
        }
        return null;
    }

}
