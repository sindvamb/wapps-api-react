package wastecnologia.wapps.api.repos;

import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import wastecnologia.wapps.api.domain.Order;
import wastecnologia.wapps.api.domain.OrderStatus;
import wastecnologia.wapps.api.domain.OrderType;
import wastecnologia.wapps.api.domain.PartnerUnit;
import wastecnologia.wapps.api.domain.ProductArea;
import wastecnologia.wapps.api.domain.ProductCategory;


public interface OrderRepository extends JpaRepository<Order, UUID> {

    Order findFirstByOrderStatus(OrderStatus orderStatus);

    Order findFirstByOrderType(OrderType orderType);

    Order findFirstByPartnerUnit(PartnerUnit partnerUnit);

    Order findFirstByProductArea(ProductArea productArea);

    Order findFirstByProductCategory(ProductCategory productCategory);

}
