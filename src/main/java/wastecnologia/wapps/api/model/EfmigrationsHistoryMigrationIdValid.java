package wastecnologia.wapps.api.model;

import static java.lang.annotation.ElementType.ANNOTATION_TYPE;
import static java.lang.annotation.ElementType.FIELD;
import static java.lang.annotation.ElementType.METHOD;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Constraint;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import jakarta.validation.Payload;
import java.lang.annotation.Documented;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
import java.util.Map;
import org.springframework.web.servlet.HandlerMapping;
import wastecnologia.wapps.api.service.EfmigrationsHistoryService;


/**
 * Check that migrationId is present and available when a new EfmigrationsHistory is created.
 */
@Target({ FIELD, METHOD, ANNOTATION_TYPE })
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Constraint(
        validatedBy = EfmigrationsHistoryMigrationIdValid.EfmigrationsHistoryMigrationIdValidValidator.class
)
public @interface EfmigrationsHistoryMigrationIdValid {

    String message() default "";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};

    class EfmigrationsHistoryMigrationIdValidValidator implements ConstraintValidator<EfmigrationsHistoryMigrationIdValid, String> {

        private final EfmigrationsHistoryService efmigrationsHistoryService;
        private final HttpServletRequest request;

        public EfmigrationsHistoryMigrationIdValidValidator(
                final EfmigrationsHistoryService efmigrationsHistoryService,
                final HttpServletRequest request) {
            this.efmigrationsHistoryService = efmigrationsHistoryService;
            this.request = request;
        }

        @Override
        public boolean isValid(final String value, final ConstraintValidatorContext cvContext) {
            @SuppressWarnings("unchecked") final Map<String, String> pathVariables =
                    ((Map<String, String>)request.getAttribute(HandlerMapping.URI_TEMPLATE_VARIABLES_ATTRIBUTE));
            final String currentId = pathVariables.get("migrationId");
            if (currentId != null) {
                // only relevant for new objects
                return true;
            }
            String error = null;
            if (value == null) {
                // missing input
                error = "NotNull";
            } else if (efmigrationsHistoryService.migrationIdExists(value)) {
                error = "exists.efmigrationsHistory.migrationId";
            }
            if (error != null) {
                cvContext.disableDefaultConstraintViolation();
                cvContext.buildConstraintViolationWithTemplate("{" + error + "}")
                        .addConstraintViolation();
                return false;
            }
            return true;
        }

    }

}
