package wastecnologia.wapps.api.rest;

import io.swagger.v3.oas.annotations.responses.ApiResponse;
import jakarta.validation.Valid;
import java.util.List;
import java.util.UUID;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import wastecnologia.wapps.api.model.ProductAreaDTO;
import wastecnologia.wapps.api.service.ProductAreaService;
import wastecnologia.wapps.api.util.ReferencedException;
import wastecnologia.wapps.api.util.ReferencedWarning;


@RestController
@RequestMapping(value = "/api/productAreas", produces = MediaType.APPLICATION_JSON_VALUE)
public class ProductAreaResource {

    private final ProductAreaService productAreaService;

    public ProductAreaResource(final ProductAreaService productAreaService) {
        this.productAreaService = productAreaService;
    }

    @GetMapping
    public ResponseEntity<List<ProductAreaDTO>> getAllProductAreas() {
        return ResponseEntity.ok(productAreaService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductAreaDTO> getProductArea(@PathVariable(name = "id") final UUID id) {
        return ResponseEntity.ok(productAreaService.get(id));
    }

    @PostMapping
    @ApiResponse(responseCode = "201")
    public ResponseEntity<UUID> createProductArea(
            @RequestBody @Valid final ProductAreaDTO productAreaDTO) {
        final UUID createdId = productAreaService.create(productAreaDTO);
        return new ResponseEntity<>(createdId, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UUID> updateProductArea(@PathVariable(name = "id") final UUID id,
            @RequestBody @Valid final ProductAreaDTO productAreaDTO) {
        productAreaService.update(id, productAreaDTO);
        return ResponseEntity.ok(id);
    }

    @DeleteMapping("/{id}")
    @ApiResponse(responseCode = "204")
    public ResponseEntity<Void> deleteProductArea(@PathVariable(name = "id") final UUID id) {
        final ReferencedWarning referencedWarning = productAreaService.getReferencedWarning(id);
        if (referencedWarning != null) {
            throw new ReferencedException(referencedWarning);
        }
        productAreaService.delete(id);
        return ResponseEntity.noContent().build();
    }

}
