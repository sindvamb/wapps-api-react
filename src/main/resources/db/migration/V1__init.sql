CREATE SCHEMA IF NOT EXISTS sindvamb;

CREATE TABLE sindvamb.access_control
(
    id              UUID                        NOT NULL,
    user_id         UUID,
    user_name       TEXT,
    connection_time TIMESTAMP WITHOUT TIME ZONE,
    last_beat_time  TIMESTAMP WITHOUT TIME ZONE,
    dur             VARCHAR(255),
    ip              TEXT,
    city            TEXT,
    os              TEXT,
    device          TEXT,
    browser         TEXT,
    language        TEXT,
    engine          TEXT,
    request_url     TEXT,
    date_created    TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    last_updated    TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    CONSTRAINT pk_accesscontrol PRIMARY KEY (id)
);

CREATE TABLE sindvamb.address
(
    id            UUID                        NOT NULL,
    zip_code      TEXT,
    neighborhood  TEXT,
    address_line1 TEXT,
    address_line2 TEXT,
    complement    TEXT,
    number        BIGINT,
    city          TEXT,
    district      TEXT,
    uf            TEXT,
    housing       TEXT,
    date_created  TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    last_updated  TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    CONSTRAINT pk_address PRIMARY KEY (id)
);

CREATE TABLE sindvamb.application_config
(
    id           UUID                        NOT NULL,
    value        TEXT                        NOT NULL,
    description  TEXT                        NOT NULL,
    creator_id   UUID,
    modifier_id  UUID,
    deleter_id   UUID,
    is_deleted   BOOLEAN                     NOT NULL,
    created_at   TIMESTAMP WITHOUT TIME ZONE,
    updated_at   TIMESTAMP WITHOUT TIME ZONE,
    deleted_at   TIMESTAMP WITHOUT TIME ZONE,
    date_created TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    last_updated TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    CONSTRAINT pk_applicationconfig PRIMARY KEY (id)
);

CREATE TABLE sindvamb.attachment
(
    id           UUID                        NOT NULL,
    size         DECIMAL(18, 4)              NOT NULL,
    name         TEXT                        NOT NULL,
    content_type TEXT                        NOT NULL,
    is_public    BOOLEAN                     NOT NULL,
    description  TEXT                        NOT NULL,
    path         TEXT                        NOT NULL,
    absolute_url TEXT                        NOT NULL,
    in_cloud     BOOLEAN                     NOT NULL,
    file_data    TEXT                        NOT NULL,
    ticket_id    UUID,
    date_created TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    last_updated TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    CONSTRAINT pk_attachment PRIMARY KEY (id)
);

CREATE TABLE sindvamb.audit
(
    id           UUID                        NOT NULL,
    table_name   TEXT,
    key_values   TEXT,
    old_values   TEXT,
    new_values   TEXT,
    ip_address   TEXT,
    user_id      UUID,
    date_created TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    last_updated TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    CONSTRAINT pk_audit PRIMARY KEY (id)
);

CREATE TABLE sindvamb.company
(
    id                       UUID                        NOT NULL,
    foundation_date          TIMESTAMP WITHOUT TIME ZONE,
    cpf_cnpj                 TEXT                        NOT NULL,
    size                     INTEGER                     NOT NULL,
    corporate_name           TEXT                        NOT NULL,
    state_registration       TEXT,
    municipal_registration   TEXT,
    main_cnae_code           TEXT,
    main_cnae_description    TEXT,
    legal_nature_code        TEXT,
    legal_nature_description TEXT,
    status                   INTEGER                     NOT NULL,
    has_gov_br_registration  BOOLEAN                     NOT NULL,
    has_digital_certificate  BOOLEAN                     NOT NULL,
    trade_name               TEXT,
    has_logo                 BOOLEAN                     NOT NULL,
    has_visual_identity      BOOLEAN                     NOT NULL,
    inpi_registration        TEXT,
    business_law             TEXT,
    employees_count          INTEGER,
    young_apprentices_count  INTEGER,
    usesesocial              BOOLEAN                     NOT NULL,
    sebrae_training          TEXT,
    senac_training           TEXT,
    anvisa_training          TEXT,
    civil_defense_training   TEXT,
    website                  TEXT,
    email                    TEXT,
    creator_id               UUID,
    modifier_id              UUID,
    deleter_id               UUID,
    is_deleted               BOOLEAN                     NOT NULL,
    created_at               TIMESTAMP WITHOUT TIME ZONE,
    updated_at               TIMESTAMP WITHOUT TIME ZONE,
    deleted_at               TIMESTAMP WITHOUT TIME ZONE,
    payment_date             TIMESTAMP WITHOUT TIME ZONE,
    address_id               UUID,
    customer_id              UUID,
    date_created             TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    last_updated             TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    CONSTRAINT pk_company PRIMARY KEY (id)
);

CREATE TABLE sindvamb.company_contact
(
    id                   UUID                        NOT NULL,
    area                 TEXT,
    name                 TEXT                        NOT NULL,
    role                 TEXT                        NOT NULL,
    corporate_email      TEXT,
    phone                TEXT,
    corporate_cell_phone TEXT,
    personal_cell_phone  TEXT,
    company_id           UUID                        NOT NULL,
    date_created         TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    last_updated         TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    CONSTRAINT pk_companycontact PRIMARY KEY (id)
);

CREATE TABLE sindvamb.contact
(
    id                 UUID                        NOT NULL,
    name               TEXT                        NOT NULL,
    cpf_cnpj           TEXT,
    email              TEXT,
    phone              TEXT,
    cell_phone         TEXT,
    fax                TEXT,
    main_activity_code TEXT,
    economic_activity  TEXT,
    address_id         UUID,
    date_created       TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    last_updated       TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    CONSTRAINT pk_contact PRIMARY KEY (id)
);

CREATE TABLE sindvamb.contact_request
(
    id            UUID                        NOT NULL,
    subject       TEXT                        NOT NULL,
    profile       TEXT                        NOT NULL,
    message       TEXT                        NOT NULL,
    response      TEXT,
    has_viewd     BOOLEAN                     NOT NULL,
    has_answered  BOOLEAN                     NOT NULL,
    has_pendding  BOOLEAN                     NOT NULL,
    answered_date TIMESTAMP WITHOUT TIME ZONE,
    created_at    TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    contact_id    UUID,
    date_created  TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    last_updated  TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    CONSTRAINT pk_contactrequest PRIMARY KEY (id)
);

CREATE TABLE sindvamb.customer
(
    id               UUID                        NOT NULL,
    creator_id       UUID,
    modifier_id      UUID,
    deleter_id       UUID,
    is_deleted       BOOLEAN                     NOT NULL,
    created_at       TIMESTAMP WITHOUT TIME ZONE,
    updated_at       TIMESTAMP WITHOUT TIME ZONE,
    deleted_at       TIMESTAMP WITHOUT TIME ZONE,
    company_id       UUID,
    customer_type_id UUID,
    partner_unit_id  UUID,
    user_id          UUID                        NOT NULL,
    date_created     TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    last_updated     TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    CONSTRAINT pk_customer PRIMARY KEY (id)
);

CREATE TABLE sindvamb.customer_order
(
    id            UUID                        NOT NULL,
    is_wapps      BOOLEAN                     NOT NULL,
    is_presidency BOOLEAN                     NOT NULL,
    is_client     BOOLEAN                     NOT NULL,
    is_director   BOOLEAN                     NOT NULL,
    is_manager    BOOLEAN                     NOT NULL,
    creator_id    UUID,
    modifier_id   UUID,
    deleter_id    UUID,
    is_deleted    BOOLEAN                     NOT NULL,
    created_at    TIMESTAMP WITHOUT TIME ZONE,
    updated_at    TIMESTAMP WITHOUT TIME ZONE,
    deleted_at    TIMESTAMP WITHOUT TIME ZONE,
    customer_id   UUID                        NOT NULL,
    order_id      UUID                        NOT NULL,
    date_created  TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    last_updated  TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    CONSTRAINT pk_customerorder PRIMARY KEY (id)
);

CREATE TABLE sindvamb.customer_type
(
    id           UUID                        NOT NULL,
    code         TEXT,
    description  TEXT,
    date_created TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    last_updated TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    CONSTRAINT pk_customertype PRIMARY KEY (id)
);

CREATE TABLE sindvamb.dependent
(
    id           UUID                        NOT NULL,
    name         TEXT                        NOT NULL,
    cpf_cnpj     TEXT,
    email        TEXT,
    cell_phone   TEXT,
    type         TEXT,
    customer_id  UUID                        NOT NULL,
    date_created TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    last_updated TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    CONSTRAINT pk_dependent PRIMARY KEY (id)
);

CREATE TABLE sindvamb.education_degree
(
    id           UUID                        NOT NULL,
    code         TEXT                        NOT NULL,
    description  TEXT                        NOT NULL,
    date_created TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    last_updated TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    CONSTRAINT pk_educationdegree PRIMARY KEY (id)
);

CREATE TABLE sindvamb.email_history
(
    id           UUID                        NOT NULL,
    user_id      UUID,
    is_success   BOOLEAN                     NOT NULL,
    reason       TEXT                        NOT NULL,
    email        TEXT                        NOT NULL,
    template_key TEXT                        NOT NULL,
    data         TEXT                        NOT NULL,
    ip_address   TEXT                        NOT NULL,
    message_id   TEXT                        NOT NULL,
    date         TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    date_created TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    last_updated TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    CONSTRAINT pk_emailhistory PRIMARY KEY (id)
);

CREATE TABLE sindvamb.employee
(
    id            UUID                        NOT NULL,
    name          TEXT                        NOT NULL,
    cpf_cnpj      TEXT                        NOT NULL,
    description   TEXT,
    cell_phone    TEXT,
    position      TEXT                        NOT NULL,
    is_apprentice BOOLEAN                     NOT NULL,
    customer_id   UUID,
    address       TEXT,
    company_id    UUID,
    date_created  TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    last_updated  TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    CONSTRAINT pk_employee PRIMARY KEY (id)
);

CREATE TABLE sindvamb.equipament
(
    id           UUID                        NOT NULL,
    name         TEXT                        NOT NULL,
    description  TEXT,
    voltage      TEXT,
    type         TEXT,
    weight       TEXT,
    customer_id  UUID,
    company_id   UUID,
    date_created TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    last_updated TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    CONSTRAINT pk_equipament PRIMARY KEY (id)
);

CREATE TABLE sindvamb.event
(
    id                    UUID                        NOT NULL,
    name                  TEXT                        NOT NULL,
    place_realization     TEXT                        NOT NULL,
    address               TEXT,
    description           TEXT                        NOT NULL,
    event_type            TEXT,
    city                  TEXT                        NOT NULL,
    uf                    TEXT                        NOT NULL,
    programing            TEXT                        NOT NULL,
    assembly_instructions TEXT                        NOT NULL,
    party_payment_date    TIMESTAMP WITHOUT TIME ZONE,
    party_date            TIMESTAMP WITHOUT TIME ZONE,
    time_start            time WITHOUT TIME ZONE,
    time_end              time WITHOUT TIME ZONE,
    tent_value            DECIMAL(10, 2),
    circulating_value     DECIMAL(10, 2),
    creator_id            UUID,
    modifier_id           UUID,
    deleter_id            UUID,
    is_deleted            BOOLEAN                     NOT NULL,
    created_at            TIMESTAMP WITHOUT TIME ZONE,
    updated_at            TIMESTAMP WITHOUT TIME ZONE,
    deleted_at            TIMESTAMP WITHOUT TIME ZONE,
    date_created          TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    last_updated          TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    CONSTRAINT pk_event PRIMARY KEY (id)
);

CREATE TABLE sindvamb.event_customer
(
    id           UUID                        NOT NULL,
    type         TEXT                        NOT NULL,
    approved     BOOLEAN,
    company_id   UUID,
    customer_id  UUID,
    event_id     UUID                        NOT NULL,
    date_created TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    last_updated TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    CONSTRAINT pk_eventcustomer PRIMARY KEY (id)
);

CREATE TABLE sindvamb.event_employee
(
    id                UUID                        NOT NULL,
    company_id        UUID,
    employee_id       UUID,
    event_customer_id UUID,
    date_created      TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    last_updated      TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    CONSTRAINT pk_eventemployee PRIMARY KEY (id)
);

CREATE TABLE sindvamb.event_equipament
(
    id                UUID                        NOT NULL,
    company_id        UUID,
    equipament_id     UUID,
    event_customer_id UUID,
    date_created      TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    last_updated      TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    CONSTRAINT pk_eventequipament PRIMARY KEY (id)
);

CREATE TABLE sindvamb.event_menu
(
    id                UUID                        NOT NULL,
    company_id        UUID,
    event_customer_id UUID,
    menu_id           UUID,
    date_created      TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    last_updated      TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    CONSTRAINT pk_eventmenu PRIMARY KEY (id)
);

CREATE TABLE sindvamb.event_menu_item
(
    id           UUID                        NOT NULL,
    company_id   UUID,
    menu_item_id UUID,
    menu_id      UUID,
    date_created TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    last_updated TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    CONSTRAINT pk_eventmenuitem PRIMARY KEY (id)
);

CREATE TABLE sindvamb.file_control
(
    id                UUID                        NOT NULL,
    file_name         TEXT                        NOT NULL,
    file_size         DECIMAL(18, 4)              NOT NULL,
    file_array        TEXT                        NOT NULL,
    target_path       TEXT,
    content_type      TEXT                        NOT NULL,
    description       TEXT,
    approved          BOOLEAN,
    company_id        UUID,
    dependent_id      UUID,
    event_customer_id UUID,
    event_id          UUID,
    layout_id         UUID,
    portfolio_id      UUID,
    user_id           UUID,
    date_created      TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    last_updated      TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    CONSTRAINT pk_filecontrol PRIMARY KEY (id)
);

CREATE TABLE sindvamb.file_layout
(
    id           UUID                        NOT NULL,
    layout_name  TEXT                        NOT NULL,
    layout_size  INTEGER                     NOT NULL,
    date_created TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    last_updated TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    CONSTRAINT pk_filelayout PRIMARY KEY (id)
);

CREATE TABLE sindvamb.login_history
(
    id           UUID                        NOT NULL,
    is_success   BOOLEAN                     NOT NULL,
    reason       TEXT                        NOT NULL,
    ip_address   TEXT                        NOT NULL,
    date         TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    user_id      UUID                        NOT NULL,
    date_created TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    last_updated TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    CONSTRAINT pk_loginhistory PRIMARY KEY (id)
);

CREATE TABLE sindvamb.menu
(
    id           UUID                        NOT NULL,
    name         TEXT                        NOT NULL,
    description  TEXT,
    company_id   UUID,
    date_created TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    last_updated TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    CONSTRAINT pk_menu PRIMARY KEY (id)
);

CREATE TABLE sindvamb.menu_item
(
    id            UUID                        NOT NULL,
    name          TEXT                        NOT NULL,
    description   TEXT,
    quantity      TEXT,
    type          TEXT,
    gramish       TEXT,
    measured_unit TEXT,
    menu_id       UUID                        NOT NULL,
    date_created  TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    last_updated  TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    CONSTRAINT pk_menuitem PRIMARY KEY (id)
);

CREATE TABLE sindvamb."order"
(
    id                  UUID                        NOT NULL,
    description         TEXT,
    sigla               TEXT,
    protocol            TEXT,
    due_date            TIMESTAMP WITHOUT TIME ZONE,
    enabled             BOOLEAN,
    order_index         INTEGER,
    creator_id          UUID,
    modifier_id         UUID,
    deleter_id          UUID,
    is_deleted          BOOLEAN                     NOT NULL,
    created_at          TIMESTAMP WITHOUT TIME ZONE,
    updated_at          TIMESTAMP WITHOUT TIME ZONE,
    deleted_at          TIMESTAMP WITHOUT TIME ZONE,
    order_status_id     UUID                        NOT NULL,
    order_type_id       UUID                        NOT NULL,
    partner_unit_id     UUID                        NOT NULL,
    product_area_id     UUID                        NOT NULL,
    product_category_id UUID                        NOT NULL,
    date_created        TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    last_updated        TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    CONSTRAINT pk_order PRIMARY KEY (id)
);

CREATE TABLE sindvamb.order_email
(
    id           UUID                        NOT NULL,
    email        TEXT                        NOT NULL,
    order_id     UUID                        NOT NULL,
    ticket_id    UUID,
    date_created TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    last_updated TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    CONSTRAINT pk_orderemail PRIMARY KEY (id)
);

CREATE TABLE sindvamb.order_file_control
(
    id              UUID                        NOT NULL,
    file_control_id UUID                        NOT NULL,
    order_id        UUID                        NOT NULL,
    date_created    TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    last_updated    TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    CONSTRAINT pk_orderfilecontrol PRIMARY KEY (id)
);

CREATE TABLE sindvamb.order_property
(
    id           UUID                        NOT NULL,
    value        TEXT,
    order_id     UUID                        NOT NULL,
    date_created TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    last_updated TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    CONSTRAINT pk_orderproperty PRIMARY KEY (id)
);

CREATE TABLE sindvamb.order_status
(
    id           UUID                        NOT NULL,
    code         TEXT,
    description  TEXT,
    date_created TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    last_updated TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    CONSTRAINT pk_orderstatus PRIMARY KEY (id)
);

CREATE TABLE sindvamb.order_tracking
(
    id           UUID                        NOT NULL,
    track_date   TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    history      TEXT,
    order_id     UUID                        NOT NULL,
    date_created TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    last_updated TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    CONSTRAINT pk_ordertracking PRIMARY KEY (id)
);

CREATE TABLE sindvamb.order_type
(
    id           UUID                        NOT NULL,
    code         TEXT,
    description  TEXT,
    date_created TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    last_updated TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    CONSTRAINT pk_ordertype PRIMARY KEY (id)
);

CREATE TABLE sindvamb.partner
(
    id           UUID                        NOT NULL,
    name         TEXT,
    cpf_cnpj     TEXT,
    email        TEXT,
    enabled      BOOLEAN,
    creator_id   UUID,
    modifier_id  UUID,
    deleter_id   UUID,
    is_deleted   BOOLEAN                     NOT NULL,
    created_at   TIMESTAMP WITHOUT TIME ZONE,
    updated_at   TIMESTAMP WITHOUT TIME ZONE,
    deleted_at   TIMESTAMP WITHOUT TIME ZONE,
    date_created TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    last_updated TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    CONSTRAINT pk_partner PRIMARY KEY (id)
);

CREATE TABLE sindvamb.partner_unit
(
    id           UUID                        NOT NULL,
    name         TEXT,
    cpf_cnpj     TEXT,
    email        TEXT,
    enabled      BOOLEAN,
    creator_id   UUID,
    modifier_id  UUID,
    deleter_id   UUID,
    is_deleted   BOOLEAN                     NOT NULL,
    created_at   TIMESTAMP WITHOUT TIME ZONE,
    updated_at   TIMESTAMP WITHOUT TIME ZONE,
    deleted_at   TIMESTAMP WITHOUT TIME ZONE,
    partner_id   UUID                        NOT NULL,
    date_created TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    last_updated TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    CONSTRAINT pk_partnerunit PRIMARY KEY (id)
);

CREATE TABLE sindvamb.password_history
(
    id            UUID                        NOT NULL,
    old_password  TEXT,
    new_password  TEXT                        NOT NULL,
    security_code TEXT                        NOT NULL,
    has_changed   BOOLEAN                     NOT NULL,
    creator_id    UUID,
    modifier_id   UUID,
    deleter_id    UUID,
    is_deleted    BOOLEAN                     NOT NULL,
    created_at    TIMESTAMP WITHOUT TIME ZONE,
    updated_at    TIMESTAMP WITHOUT TIME ZONE,
    deleted_at    TIMESTAMP WITHOUT TIME ZONE,
    user_id       UUID                        NOT NULL,
    date_created  TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    last_updated  TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    CONSTRAINT pk_passwordhistory PRIMARY KEY (id)
);

CREATE TABLE sindvamb.portfolio
(
    id           UUID                        NOT NULL,
    title        TEXT                        NOT NULL,
    file_path    TEXT,
    customer_id  UUID,
    company_id   UUID,
    date_created TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    last_updated TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    CONSTRAINT pk_portfolio PRIMARY KEY (id)
);

CREATE TABLE sindvamb.product_area
(
    id           UUID                        NOT NULL,
    code         TEXT                        NOT NULL,
    description  TEXT                        NOT NULL,
    date_created TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    last_updated TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    CONSTRAINT pk_productarea PRIMARY KEY (id)
);

CREATE TABLE sindvamb.product_category
(
    id           UUID                        NOT NULL,
    code         TEXT,
    description  TEXT,
    date_created TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    last_updated TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    CONSTRAINT pk_productcategory PRIMARY KEY (id)
);

CREATE TABLE sindvamb.registration_request
(
    id           UUID                        NOT NULL,
    approved     BOOLEAN,
    reason       TEXT,
    protocol     TEXT                        NOT NULL,
    date         TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    user_id      UUID                        NOT NULL,
    date_created TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    last_updated TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    CONSTRAINT pk_registrationrequest PRIMARY KEY (id)
);

CREATE TABLE sindvamb.role
(
    id           UUID                        NOT NULL,
    value        TEXT                        NOT NULL,
    description  TEXT                        NOT NULL,
    date_created TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    last_updated TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    CONSTRAINT pk_role PRIMARY KEY (id)
);

CREATE TABLE sindvamb.special_needs
(
    id           UUID                        NOT NULL,
    description  TEXT                        NOT NULL,
    user_id      UUID                        NOT NULL,
    date_created TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    last_updated TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    CONSTRAINT pk_specialneeds PRIMARY KEY (id)
);

CREATE TABLE sindvamb.ticket
(
    id               UUID                        NOT NULL,
    solution         TEXT,
    due_date         TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    active           BOOLEAN,
    creator_id       UUID,
    modifier_id      UUID,
    deleter_id       UUID,
    is_deleted       BOOLEAN                     NOT NULL,
    created_at       TIMESTAMP WITHOUT TIME ZONE,
    updated_at       TIMESTAMP WITHOUT TIME ZONE,
    deleted_at       TIMESTAMP WITHOUT TIME ZONE,
    customer_id      UUID                        NOT NULL,
    order_id         UUID                        NOT NULL,
    ticket_status_id UUID,
    date_created     TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    last_updated     TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    CONSTRAINT pk_ticket PRIMARY KEY (id)
);

CREATE TABLE sindvamb.ticket_property
(
    id           UUID                        NOT NULL,
    value        TEXT,
    ticket_id    UUID                        NOT NULL,
    date_created TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    last_updated TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    CONSTRAINT pk_ticketproperty PRIMARY KEY (id)
);

CREATE TABLE sindvamb.ticket_status
(
    id           UUID                        NOT NULL,
    code         TEXT,
    description  TEXT,
    date_created TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    last_updated TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    CONSTRAINT pk_ticketstatus PRIMARY KEY (id)
);

CREATE TABLE sindvamb."user"
(
    id                       UUID                        NOT NULL,
    matricula                INTEGER,
    name                     TEXT                        NOT NULL,
    social_name              TEXT,
    surname                  TEXT,
    gender                   TEXT,
    birthplace               TEXT,
    civil_status             TEXT,
    father_name              TEXT,
    mother_name              TEXT,
    nationality              TEXT,
    rg                       TEXT,
    uf_issuing_body          TEXT,
    cpf_cnpj                 TEXT                        NOT NULL,
    email                    TEXT,
    password                 TEXT,
    race                     TEXT,
    profession               TEXT,
    cell_phone               TEXT,
    home_phone               TEXT,
    business_phone           TEXT,
    has_special_needs        BOOLEAN                     NOT NULL,
    special_needs_other      TEXT,
    is_system                BOOLEAN                     NOT NULL,
    is_customer              BOOLEAN,
    securely_phrase          TEXT,
    login_attemps            INTEGER,
    password_policy_enabled  BOOLEAN,
    birthdate                TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    last_login_at            TIMESTAMP WITHOUT TIME ZONE,
    last_password_changed_at TIMESTAMP WITHOUT TIME ZONE,
    password_reset_token     UUID,
    creator_id               UUID,
    modifier_id              UUID,
    deleter_id               UUID,
    is_deleted               BOOLEAN                     NOT NULL,
    created_at               TIMESTAMP WITHOUT TIME ZONE,
    updated_at               TIMESTAMP WITHOUT TIME ZONE,
    deleted_at               TIMESTAMP WITHOUT TIME ZONE,
    address_id               UUID,
    education_degree_id      UUID,
    partner_unit_id          UUID,
    role_id                  UUID,
    user_status_id           UUID,
    date_created             TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    last_updated             TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    CONSTRAINT pk_user PRIMARY KEY (id)
);

CREATE TABLE sindvamb.user_status
(
    id           UUID                        NOT NULL,
    code         TEXT                        NOT NULL,
    description  TEXT                        NOT NULL,
    date_created TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    last_updated TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    CONSTRAINT pk_userstatus PRIMARY KEY (id)
);

ALTER TABLE sindvamb.attachment
    ADD CONSTRAINT FK_ATTACHMENT_ON_TICKET FOREIGN KEY (ticket_id) REFERENCES sindvamb.ticket (id);

ALTER TABLE sindvamb.audit
    ADD CONSTRAINT FK_AUDIT_ON_USER FOREIGN KEY (user_id) REFERENCES sindvamb."user" (id);

ALTER TABLE sindvamb.company_contact
    ADD CONSTRAINT FK_COMPANYCONTACT_ON_COMPANY FOREIGN KEY (company_id) REFERENCES sindvamb.company (id);

ALTER TABLE sindvamb.company
    ADD CONSTRAINT FK_COMPANY_ON_ADDRESS FOREIGN KEY (address_id) REFERENCES sindvamb.address (id);

ALTER TABLE sindvamb.company
    ADD CONSTRAINT FK_COMPANY_ON_CUSTOMER FOREIGN KEY (customer_id) REFERENCES sindvamb.customer (id);

ALTER TABLE sindvamb.contact_request
    ADD CONSTRAINT FK_CONTACTREQUEST_ON_CONTACT FOREIGN KEY (contact_id) REFERENCES sindvamb.contact (id);

ALTER TABLE sindvamb.contact
    ADD CONSTRAINT FK_CONTACT_ON_ADDRESS FOREIGN KEY (address_id) REFERENCES sindvamb.address (id);

ALTER TABLE sindvamb.customer_order
    ADD CONSTRAINT FK_CUSTOMERORDER_ON_CUSTOMER FOREIGN KEY (customer_id) REFERENCES sindvamb.customer (id);

ALTER TABLE sindvamb.customer_order
    ADD CONSTRAINT FK_CUSTOMERORDER_ON_ORDER FOREIGN KEY (order_id) REFERENCES sindvamb."order" (id);

ALTER TABLE sindvamb.customer
    ADD CONSTRAINT FK_CUSTOMER_ON_CUSTOMER_TYPE FOREIGN KEY (customer_type_id) REFERENCES sindvamb.customer_type (id);

ALTER TABLE sindvamb.customer
    ADD CONSTRAINT FK_CUSTOMER_ON_PARTNER_UNIT FOREIGN KEY (partner_unit_id) REFERENCES sindvamb.partner_unit (id);

ALTER TABLE sindvamb.customer
    ADD CONSTRAINT FK_CUSTOMER_ON_USER FOREIGN KEY (user_id) REFERENCES sindvamb."user" (id);

ALTER TABLE sindvamb.dependent
    ADD CONSTRAINT FK_DEPENDENT_ON_CUSTOMER FOREIGN KEY (customer_id) REFERENCES sindvamb.customer (id);

ALTER TABLE sindvamb.employee
    ADD CONSTRAINT FK_EMPLOYEE_ON_COMPANY FOREIGN KEY (company_id) REFERENCES sindvamb.company (id);

ALTER TABLE sindvamb.equipament
    ADD CONSTRAINT FK_EQUIPAMENT_ON_COMPANY FOREIGN KEY (company_id) REFERENCES sindvamb.company (id);

ALTER TABLE sindvamb.event_customer
    ADD CONSTRAINT FK_EVENTCUSTOMER_ON_COMPANY FOREIGN KEY (company_id) REFERENCES sindvamb.company (id);

ALTER TABLE sindvamb.event_customer
    ADD CONSTRAINT FK_EVENTCUSTOMER_ON_CUSTOMER FOREIGN KEY (customer_id) REFERENCES sindvamb.customer (id);

ALTER TABLE sindvamb.event_customer
    ADD CONSTRAINT FK_EVENTCUSTOMER_ON_EVENT FOREIGN KEY (event_id) REFERENCES sindvamb.event (id);

ALTER TABLE sindvamb.event_employee
    ADD CONSTRAINT FK_EVENTEMPLOYEE_ON_COMPANY FOREIGN KEY (company_id) REFERENCES sindvamb.company (id);

ALTER TABLE sindvamb.event_employee
    ADD CONSTRAINT FK_EVENTEMPLOYEE_ON_EMPLOYEE FOREIGN KEY (employee_id) REFERENCES sindvamb.employee (id);

ALTER TABLE sindvamb.event_employee
    ADD CONSTRAINT FK_EVENTEMPLOYEE_ON_EVENT_CUSTOMER FOREIGN KEY (event_customer_id) REFERENCES sindvamb.event_customer (id);

ALTER TABLE sindvamb.event_equipament
    ADD CONSTRAINT FK_EVENTEQUIPAMENT_ON_COMPANY FOREIGN KEY (company_id) REFERENCES sindvamb.company (id);

ALTER TABLE sindvamb.event_equipament
    ADD CONSTRAINT FK_EVENTEQUIPAMENT_ON_EQUIPAMENT FOREIGN KEY (equipament_id) REFERENCES sindvamb.equipament (id);

ALTER TABLE sindvamb.event_equipament
    ADD CONSTRAINT FK_EVENTEQUIPAMENT_ON_EVENT_CUSTOMER FOREIGN KEY (event_customer_id) REFERENCES sindvamb.event_customer (id);

ALTER TABLE sindvamb.event_menu_item
    ADD CONSTRAINT FK_EVENTMENUITEM_ON_COMPANY FOREIGN KEY (company_id) REFERENCES sindvamb.company (id);

ALTER TABLE sindvamb.event_menu_item
    ADD CONSTRAINT FK_EVENTMENUITEM_ON_MENU FOREIGN KEY (menu_id) REFERENCES sindvamb.menu (id);

ALTER TABLE sindvamb.event_menu_item
    ADD CONSTRAINT FK_EVENTMENUITEM_ON_MENU_ITEM FOREIGN KEY (menu_item_id) REFERENCES sindvamb.menu_item (id);

ALTER TABLE sindvamb.event_menu
    ADD CONSTRAINT FK_EVENTMENU_ON_COMPANY FOREIGN KEY (company_id) REFERENCES sindvamb.company (id);

ALTER TABLE sindvamb.event_menu
    ADD CONSTRAINT FK_EVENTMENU_ON_EVENT_CUSTOMER FOREIGN KEY (event_customer_id) REFERENCES sindvamb.event_customer (id);

ALTER TABLE sindvamb.event_menu
    ADD CONSTRAINT FK_EVENTMENU_ON_MENU FOREIGN KEY (menu_id) REFERENCES sindvamb.menu (id);

ALTER TABLE sindvamb.file_control
    ADD CONSTRAINT FK_FILECONTROL_ON_COMPANY FOREIGN KEY (company_id) REFERENCES sindvamb.company (id);

ALTER TABLE sindvamb.file_control
    ADD CONSTRAINT FK_FILECONTROL_ON_DEPENDENT FOREIGN KEY (dependent_id) REFERENCES sindvamb.dependent (id);

ALTER TABLE sindvamb.file_control
    ADD CONSTRAINT FK_FILECONTROL_ON_EVENT FOREIGN KEY (event_id) REFERENCES sindvamb.event (id);

ALTER TABLE sindvamb.file_control
    ADD CONSTRAINT FK_FILECONTROL_ON_EVENT_CUSTOMER FOREIGN KEY (event_customer_id) REFERENCES sindvamb.event_customer (id);

ALTER TABLE sindvamb.file_control
    ADD CONSTRAINT FK_FILECONTROL_ON_LAYOUT FOREIGN KEY (layout_id) REFERENCES sindvamb.file_layout (id);

ALTER TABLE sindvamb.file_control
    ADD CONSTRAINT FK_FILECONTROL_ON_PORTFOLIO FOREIGN KEY (portfolio_id) REFERENCES sindvamb.portfolio (id);

ALTER TABLE sindvamb.file_control
    ADD CONSTRAINT FK_FILECONTROL_ON_USER FOREIGN KEY (user_id) REFERENCES sindvamb."user" (id);

ALTER TABLE sindvamb.login_history
    ADD CONSTRAINT FK_LOGINHISTORY_ON_USER FOREIGN KEY (user_id) REFERENCES sindvamb."user" (id);

ALTER TABLE sindvamb.menu_item
    ADD CONSTRAINT FK_MENUITEM_ON_MENU FOREIGN KEY (menu_id) REFERENCES sindvamb.menu (id);

ALTER TABLE sindvamb.menu
    ADD CONSTRAINT FK_MENU_ON_COMPANY FOREIGN KEY (company_id) REFERENCES sindvamb.company (id);

ALTER TABLE sindvamb.order_email
    ADD CONSTRAINT FK_ORDEREMAIL_ON_ORDER FOREIGN KEY (order_id) REFERENCES sindvamb."order" (id);

ALTER TABLE sindvamb.order_email
    ADD CONSTRAINT FK_ORDEREMAIL_ON_TICKET FOREIGN KEY (ticket_id) REFERENCES sindvamb.ticket (id);

ALTER TABLE sindvamb.order_file_control
    ADD CONSTRAINT FK_ORDERFILECONTROL_ON_FILE_CONTROL FOREIGN KEY (file_control_id) REFERENCES sindvamb.file_control (id);

ALTER TABLE sindvamb.order_file_control
    ADD CONSTRAINT FK_ORDERFILECONTROL_ON_ORDER FOREIGN KEY (order_id) REFERENCES sindvamb."order" (id);

ALTER TABLE sindvamb.order_property
    ADD CONSTRAINT FK_ORDERPROPERTY_ON_ORDER FOREIGN KEY (order_id) REFERENCES sindvamb."order" (id);

ALTER TABLE sindvamb.order_tracking
    ADD CONSTRAINT FK_ORDERTRACKING_ON_ORDER FOREIGN KEY (order_id) REFERENCES sindvamb."order" (id);

ALTER TABLE sindvamb."order"
    ADD CONSTRAINT FK_ORDER_ON_ORDER_STATUS FOREIGN KEY (order_status_id) REFERENCES sindvamb.order_status (id);

ALTER TABLE sindvamb."order"
    ADD CONSTRAINT FK_ORDER_ON_ORDER_TYPE FOREIGN KEY (order_type_id) REFERENCES sindvamb.order_type (id);

ALTER TABLE sindvamb."order"
    ADD CONSTRAINT FK_ORDER_ON_PARTNER_UNIT FOREIGN KEY (partner_unit_id) REFERENCES sindvamb.partner_unit (id);

ALTER TABLE sindvamb."order"
    ADD CONSTRAINT FK_ORDER_ON_PRODUCT_AREA FOREIGN KEY (product_area_id) REFERENCES sindvamb.product_area (id);

ALTER TABLE sindvamb."order"
    ADD CONSTRAINT FK_ORDER_ON_PRODUCT_CATEGORY FOREIGN KEY (product_category_id) REFERENCES sindvamb.product_category (id);

ALTER TABLE sindvamb.partner_unit
    ADD CONSTRAINT FK_PARTNERUNIT_ON_PARTNER FOREIGN KEY (partner_id) REFERENCES sindvamb.partner (id);

ALTER TABLE sindvamb.password_history
    ADD CONSTRAINT FK_PASSWORDHISTORY_ON_USER FOREIGN KEY (user_id) REFERENCES sindvamb."user" (id);

ALTER TABLE sindvamb.portfolio
    ADD CONSTRAINT FK_PORTFOLIO_ON_COMPANY FOREIGN KEY (company_id) REFERENCES sindvamb.company (id);

ALTER TABLE sindvamb.registration_request
    ADD CONSTRAINT FK_REGISTRATIONREQUEST_ON_USER FOREIGN KEY (user_id) REFERENCES sindvamb."user" (id);

ALTER TABLE sindvamb.special_needs
    ADD CONSTRAINT FK_SPECIALNEEDS_ON_USER FOREIGN KEY (user_id) REFERENCES sindvamb."user" (id);

ALTER TABLE sindvamb.ticket_property
    ADD CONSTRAINT FK_TICKETPROPERTY_ON_TICKET FOREIGN KEY (ticket_id) REFERENCES sindvamb.ticket (id);

ALTER TABLE sindvamb.ticket
    ADD CONSTRAINT FK_TICKET_ON_CUSTOMER FOREIGN KEY (customer_id) REFERENCES sindvamb.customer (id);

ALTER TABLE sindvamb.ticket
    ADD CONSTRAINT FK_TICKET_ON_ORDER FOREIGN KEY (order_id) REFERENCES sindvamb."order" (id);

ALTER TABLE sindvamb.ticket
    ADD CONSTRAINT FK_TICKET_ON_TICKET_STATUS FOREIGN KEY (ticket_status_id) REFERENCES sindvamb.ticket_status (id);

ALTER TABLE sindvamb."user"
    ADD CONSTRAINT FK_USER_ON_ADDRESS FOREIGN KEY (address_id) REFERENCES sindvamb.address (id);

ALTER TABLE sindvamb."user"
    ADD CONSTRAINT FK_USER_ON_EDUCATION_DEGREE FOREIGN KEY (education_degree_id) REFERENCES sindvamb.education_degree (id);

ALTER TABLE sindvamb."user"
    ADD CONSTRAINT FK_USER_ON_PARTNER_UNIT FOREIGN KEY (partner_unit_id) REFERENCES sindvamb.partner_unit (id);

ALTER TABLE sindvamb."user"
    ADD CONSTRAINT FK_USER_ON_ROLE FOREIGN KEY (role_id) REFERENCES sindvamb.role (id);

ALTER TABLE sindvamb."user"
    ADD CONSTRAINT FK_USER_ON_USER_STATUS FOREIGN KEY (user_status_id) REFERENCES sindvamb.user_status (id);