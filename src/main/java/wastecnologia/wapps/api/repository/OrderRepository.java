package wastecnologia.wapps.api.repository;

import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import wastecnologia.wapps.api.domain.entity.Order;
import wastecnologia.wapps.api.domain.entity.OrderStatus;
import wastecnologia.wapps.api.domain.entity.OrderType;
import wastecnologia.wapps.api.domain.entity.PartnerUnit;
import wastecnologia.wapps.api.domain.entity.ProductArea;
import wastecnologia.wapps.api.domain.entity.ProductCategory;


public interface OrderRepository extends JpaRepository<Order, UUID> {

    Order findFirstByOrderStatus(OrderStatus orderStatus);

    Order findFirstByOrderType(OrderType orderType);

    Order findFirstByPartnerUnit(PartnerUnit partnerUnit);

    Order findFirstByProductArea(ProductArea productArea);

    Order findFirstByProductCategory(ProductCategory productCategory);

}
