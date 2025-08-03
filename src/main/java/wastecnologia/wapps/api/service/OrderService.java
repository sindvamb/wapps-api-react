package wastecnologia.wapps.api.service;

import java.util.List;
import java.util.UUID;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import wastecnologia.wapps.api.domain.entity.CustomerOrder;
import wastecnologia.wapps.api.domain.entity.Order;
import wastecnologia.wapps.api.domain.entity.OrderEmail;
import wastecnologia.wapps.api.domain.entity.OrderFileControl;
import wastecnologia.wapps.api.domain.entity.OrderProperty;
import wastecnologia.wapps.api.domain.entity.OrderStatus;
import wastecnologia.wapps.api.domain.entity.OrderTracking;
import wastecnologia.wapps.api.domain.entity.OrderType;
import wastecnologia.wapps.api.domain.entity.PartnerUnit;
import wastecnologia.wapps.api.domain.entity.ProductArea;
import wastecnologia.wapps.api.domain.entity.ProductCategory;
import wastecnologia.wapps.api.domain.entity.Ticket;
import wastecnologia.wapps.api.domain.dto.OrderDTO;
import wastecnologia.wapps.api.repository.CustomerOrderRepository;
import wastecnologia.wapps.api.repository.OrderEmailRepository;
import wastecnologia.wapps.api.repository.OrderFileControlRepository;
import wastecnologia.wapps.api.repository.OrderPropertyRepository;
import wastecnologia.wapps.api.repository.OrderRepository;
import wastecnologia.wapps.api.repository.OrderStatusRepository;
import wastecnologia.wapps.api.repository.OrderTrackingRepository;
import wastecnologia.wapps.api.repository.OrderTypeRepository;
import wastecnologia.wapps.api.repository.PartnerUnitRepository;
import wastecnologia.wapps.api.repository.ProductAreaRepository;
import wastecnologia.wapps.api.repository.ProductCategoryRepository;
import wastecnologia.wapps.api.repository.TicketRepository;
import wastecnologia.wapps.api.util.NotFoundException;
import wastecnologia.wapps.api.util.ReferencedWarning;


@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final OrderStatusRepository orderStatusRepository;
    private final OrderTypeRepository orderTypeRepository;
    private final PartnerUnitRepository partnerUnitRepository;
    private final ProductAreaRepository productAreaRepository;
    private final ProductCategoryRepository productCategoryRepository;
    private final CustomerOrderRepository customerOrderRepository;
    private final OrderEmailRepository orderEmailRepository;
    private final OrderFileControlRepository orderFileControlRepository;
    private final OrderPropertyRepository orderPropertyRepository;
    private final OrderTrackingRepository orderTrackingRepository;
    private final TicketRepository ticketRepository;

    public OrderService(final OrderRepository orderRepository,
            final OrderStatusRepository orderStatusRepository,
            final OrderTypeRepository orderTypeRepository,
            final PartnerUnitRepository partnerUnitRepository,
            final ProductAreaRepository productAreaRepository,
            final ProductCategoryRepository productCategoryRepository,
            final CustomerOrderRepository customerOrderRepository,
            final OrderEmailRepository orderEmailRepository,
            final OrderFileControlRepository orderFileControlRepository,
            final OrderPropertyRepository orderPropertyRepository,
            final OrderTrackingRepository orderTrackingRepository,
            final TicketRepository ticketRepository) {
        this.orderRepository = orderRepository;
        this.orderStatusRepository = orderStatusRepository;
        this.orderTypeRepository = orderTypeRepository;
        this.partnerUnitRepository = partnerUnitRepository;
        this.productAreaRepository = productAreaRepository;
        this.productCategoryRepository = productCategoryRepository;
        this.customerOrderRepository = customerOrderRepository;
        this.orderEmailRepository = orderEmailRepository;
        this.orderFileControlRepository = orderFileControlRepository;
        this.orderPropertyRepository = orderPropertyRepository;
        this.orderTrackingRepository = orderTrackingRepository;
        this.ticketRepository = ticketRepository;
    }

    public List<OrderDTO> findAll() {
        final List<Order> orders = orderRepository.findAll(Sort.by("id"));
        return orders.stream()
                .map(order -> mapToDTO(order, new OrderDTO()))
                .toList();
    }

    public OrderDTO get(final UUID id) {
        return orderRepository.findById(id)
                .map(order -> mapToDTO(order, new OrderDTO()))
                .orElseThrow(NotFoundException::new);
    }

    public UUID create(final OrderDTO orderDTO) {
        final Order order = new Order();
        mapToEntity(orderDTO, order);
        return orderRepository.save(order).getId();
    }

    public void update(final UUID id, final OrderDTO orderDTO) {
        final Order order = orderRepository.findById(id)
                .orElseThrow(NotFoundException::new);
        mapToEntity(orderDTO, order);
        orderRepository.save(order);
    }

    public void delete(final UUID id) {
        orderRepository.deleteById(id);
    }

    private OrderDTO mapToDTO(final Order order, final OrderDTO orderDTO) {
        orderDTO.setId(order.getId());
        orderDTO.setDescription(order.getDescription());
        orderDTO.setSigla(order.getSigla());
        orderDTO.setProtocol(order.getProtocol());
        orderDTO.setDueDate(order.getDueDate());
        orderDTO.setEnabled(order.getEnabled());
        orderDTO.setOrderIndex(order.getOrderIndex());
        orderDTO.setCreatorId(order.getCreatorId());
        orderDTO.setModifierId(order.getModifierId());
        orderDTO.setDeleterId(order.getDeleterId());
        orderDTO.setIsDeleted(order.getIsDeleted());
        orderDTO.setCreatedAt(order.getCreatedAt());
        orderDTO.setUpdatedAt(order.getUpdatedAt());
        orderDTO.setDeletedAt(order.getDeletedAt());
        orderDTO.setOrderStatus(order.getOrderStatus() == null ? null : order.getOrderStatus().getId());
        orderDTO.setOrderType(order.getOrderType() == null ? null : order.getOrderType().getId());
        orderDTO.setPartnerUnit(order.getPartnerUnit() == null ? null : order.getPartnerUnit().getId());
        orderDTO.setProductArea(order.getProductArea() == null ? null : order.getProductArea().getId());
        orderDTO.setProductCategory(order.getProductCategory() == null ? null : order.getProductCategory().getId());
        return orderDTO;
    }

    private Order mapToEntity(final OrderDTO orderDTO, final Order order) {
        order.setDescription(orderDTO.getDescription());
        order.setSigla(orderDTO.getSigla());
        order.setProtocol(orderDTO.getProtocol());
        order.setDueDate(orderDTO.getDueDate());
        order.setEnabled(orderDTO.getEnabled());
        order.setOrderIndex(orderDTO.getOrderIndex());
        order.setCreatorId(orderDTO.getCreatorId());
        order.setModifierId(orderDTO.getModifierId());
        order.setDeleterId(orderDTO.getDeleterId());
        order.setIsDeleted(orderDTO.getIsDeleted());
        order.setCreatedAt(orderDTO.getCreatedAt());
        order.setUpdatedAt(orderDTO.getUpdatedAt());
        order.setDeletedAt(orderDTO.getDeletedAt());
        final OrderStatus orderStatus = orderDTO.getOrderStatus() == null ? null : orderStatusRepository.findById(orderDTO.getOrderStatus())
                .orElseThrow(() -> new NotFoundException("orderStatus not found"));
        order.setOrderStatus(orderStatus);
        final OrderType orderType = orderDTO.getOrderType() == null ? null : orderTypeRepository.findById(orderDTO.getOrderType())
                .orElseThrow(() -> new NotFoundException("orderType not found"));
        order.setOrderType(orderType);
        final PartnerUnit partnerUnit = orderDTO.getPartnerUnit() == null ? null : partnerUnitRepository.findById(orderDTO.getPartnerUnit())
                .orElseThrow(() -> new NotFoundException("partnerUnit not found"));
        order.setPartnerUnit(partnerUnit);
        final ProductArea productArea = orderDTO.getProductArea() == null ? null : productAreaRepository.findById(orderDTO.getProductArea())
                .orElseThrow(() -> new NotFoundException("productArea not found"));
        order.setProductArea(productArea);
        final ProductCategory productCategory = orderDTO.getProductCategory() == null ? null : productCategoryRepository.findById(orderDTO.getProductCategory())
                .orElseThrow(() -> new NotFoundException("productCategory not found"));
        order.setProductCategory(productCategory);
        return order;
    }

    public ReferencedWarning getReferencedWarning(final UUID id) {
        final ReferencedWarning referencedWarning = new ReferencedWarning();
        final Order order = orderRepository.findById(id)
                .orElseThrow(NotFoundException::new);
        final CustomerOrder orderCustomerOrder = customerOrderRepository.findFirstByOrder(order);
        if (orderCustomerOrder != null) {
            referencedWarning.setKey("order.customerOrder.order.referenced");
            referencedWarning.addParam(orderCustomerOrder.getId());
            return referencedWarning;
        }
        final OrderEmail orderOrderEmail = orderEmailRepository.findFirstByOrder(order);
        if (orderOrderEmail != null) {
            referencedWarning.setKey("order.orderEmail.order.referenced");
            referencedWarning.addParam(orderOrderEmail.getId());
            return referencedWarning;
        }
        final OrderFileControl orderOrderFileControl = orderFileControlRepository.findFirstByOrder(order);
        if (orderOrderFileControl != null) {
            referencedWarning.setKey("order.orderFileControl.order.referenced");
            referencedWarning.addParam(orderOrderFileControl.getId());
            return referencedWarning;
        }
        final OrderProperty orderOrderProperty = orderPropertyRepository.findFirstByOrder(order);
        if (orderOrderProperty != null) {
            referencedWarning.setKey("order.orderProperty.order.referenced");
            referencedWarning.addParam(orderOrderProperty.getId());
            return referencedWarning;
        }
        final OrderTracking orderOrderTracking = orderTrackingRepository.findFirstByOrder(order);
        if (orderOrderTracking != null) {
            referencedWarning.setKey("order.orderTracking.order.referenced");
            referencedWarning.addParam(orderOrderTracking.getId());
            return referencedWarning;
        }
        final Ticket orderTicket = ticketRepository.findFirstByOrder(order);
        if (orderTicket != null) {
            referencedWarning.setKey("order.ticket.order.referenced");
            referencedWarning.addParam(orderTicket.getId());
            return referencedWarning;
        }
        return null;
    }

}
