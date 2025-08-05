ALTER TABLE sindvamb.attachment
ALTER
COLUMN absolute_url TYPE VARCHAR(255) USING (absolute_url::VARCHAR(255));

ALTER TABLE sindvamb.event
ALTER
COLUMN assembly_instructions TYPE VARCHAR(255) USING (assembly_instructions::VARCHAR(255));

ALTER TABLE sindvamb.event
ALTER
COLUMN city TYPE VARCHAR(255) USING (city::VARCHAR(255));

ALTER TABLE sindvamb.education_degree
ALTER
COLUMN code TYPE VARCHAR(255) USING (code::VARCHAR(255));

ALTER TABLE sindvamb.product_area
ALTER
COLUMN code TYPE VARCHAR(255) USING (code::VARCHAR(255));

ALTER TABLE sindvamb.user_status
ALTER
COLUMN code TYPE VARCHAR(255) USING (code::VARCHAR(255));

ALTER TABLE sindvamb.attachment
ALTER
COLUMN content_type TYPE VARCHAR(255) USING (content_type::VARCHAR(255));

ALTER TABLE sindvamb.file_control
ALTER
COLUMN content_type TYPE VARCHAR(255) USING (content_type::VARCHAR(255));

ALTER TABLE sindvamb.company
ALTER
COLUMN corporate_name TYPE VARCHAR(255) USING (corporate_name::VARCHAR(255));

ALTER TABLE sindvamb.company
ALTER
COLUMN cpf_cnpj TYPE VARCHAR(255) USING (cpf_cnpj::VARCHAR(255));

ALTER TABLE sindvamb.employee
ALTER
COLUMN cpf_cnpj TYPE VARCHAR(255) USING (cpf_cnpj::VARCHAR(255));

ALTER TABLE sindvamb."user"
ALTER
COLUMN cpf_cnpj TYPE VARCHAR(255) USING (cpf_cnpj::VARCHAR(255));

ALTER TABLE sindvamb.email_history
ALTER
COLUMN data TYPE VARCHAR(255) USING (data::VARCHAR(255));

ALTER TABLE sindvamb.application_config
ALTER
COLUMN description TYPE VARCHAR(255) USING (description::VARCHAR(255));

ALTER TABLE sindvamb.attachment
ALTER
COLUMN description TYPE VARCHAR(255) USING (description::VARCHAR(255));

ALTER TABLE sindvamb.education_degree
ALTER
COLUMN description TYPE VARCHAR(255) USING (description::VARCHAR(255));

ALTER TABLE sindvamb.event
ALTER
COLUMN description TYPE VARCHAR(255) USING (description::VARCHAR(255));

ALTER TABLE sindvamb.product_area
ALTER
COLUMN description TYPE VARCHAR(255) USING (description::VARCHAR(255));

ALTER TABLE sindvamb.role
ALTER
COLUMN description TYPE VARCHAR(255) USING (description::VARCHAR(255));

ALTER TABLE sindvamb.special_needs
ALTER
COLUMN description TYPE VARCHAR(255) USING (description::VARCHAR(255));

ALTER TABLE sindvamb.user_status
ALTER
COLUMN description TYPE VARCHAR(255) USING (description::VARCHAR(255));

ALTER TABLE sindvamb.email_history
ALTER
COLUMN email TYPE VARCHAR(255) USING (email::VARCHAR(255));

ALTER TABLE sindvamb.order_email
ALTER
COLUMN email TYPE VARCHAR(255) USING (email::VARCHAR(255));

ALTER TABLE sindvamb.file_control
ALTER
COLUMN file_name TYPE VARCHAR(255) USING (file_name::VARCHAR(255));

ALTER TABLE sindvamb.email_history
ALTER
COLUMN ip_address TYPE VARCHAR(255) USING (ip_address::VARCHAR(255));

ALTER TABLE sindvamb.login_history
ALTER
COLUMN ip_address TYPE VARCHAR(255) USING (ip_address::VARCHAR(255));

ALTER TABLE sindvamb.file_layout
ALTER
COLUMN layout_name TYPE VARCHAR(255) USING (layout_name::VARCHAR(255));

ALTER TABLE sindvamb.contact_request
ALTER
COLUMN message TYPE VARCHAR(255) USING (message::VARCHAR(255));

ALTER TABLE sindvamb.email_history
ALTER
COLUMN message_id TYPE VARCHAR(255) USING (message_id::VARCHAR(255));

ALTER TABLE sindvamb.attachment
ALTER
COLUMN name TYPE VARCHAR(255) USING (name::VARCHAR(255));

ALTER TABLE sindvamb.company_contact
ALTER
COLUMN name TYPE VARCHAR(255) USING (name::VARCHAR(255));

ALTER TABLE sindvamb.contact
ALTER
COLUMN name TYPE VARCHAR(255) USING (name::VARCHAR(255));

ALTER TABLE sindvamb.dependent
ALTER
COLUMN name TYPE VARCHAR(255) USING (name::VARCHAR(255));

ALTER TABLE sindvamb.employee
ALTER
COLUMN name TYPE VARCHAR(255) USING (name::VARCHAR(255));

ALTER TABLE sindvamb.equipament
ALTER
COLUMN name TYPE VARCHAR(255) USING (name::VARCHAR(255));

ALTER TABLE sindvamb.event
ALTER
COLUMN name TYPE VARCHAR(255) USING (name::VARCHAR(255));

ALTER TABLE sindvamb.menu
ALTER
COLUMN name TYPE VARCHAR(255) USING (name::VARCHAR(255));

ALTER TABLE sindvamb.menu_item
ALTER
COLUMN name TYPE VARCHAR(255) USING (name::VARCHAR(255));

ALTER TABLE sindvamb."user"
ALTER
COLUMN name TYPE VARCHAR(255) USING (name::VARCHAR(255));

ALTER TABLE sindvamb.password_history
ALTER
COLUMN new_password TYPE VARCHAR(255) USING (new_password::VARCHAR(255));

ALTER TABLE sindvamb.attachment
ALTER
COLUMN path TYPE VARCHAR(255) USING (path::VARCHAR(255));

ALTER TABLE sindvamb.event
ALTER
COLUMN place_realization TYPE VARCHAR(255) USING (place_realization::VARCHAR(255));

ALTER TABLE sindvamb.employee
ALTER
COLUMN position TYPE VARCHAR(255) USING (position::VARCHAR(255));

ALTER TABLE sindvamb.contact_request
ALTER
COLUMN profile TYPE VARCHAR(255) USING (profile::VARCHAR(255));

ALTER TABLE sindvamb.event
ALTER
COLUMN programing TYPE VARCHAR(255) USING (programing::VARCHAR(255));

ALTER TABLE sindvamb.registration_request
ALTER
COLUMN protocol TYPE VARCHAR(255) USING (protocol::VARCHAR(255));

ALTER TABLE sindvamb.email_history
ALTER
COLUMN reason TYPE VARCHAR(255) USING (reason::VARCHAR(255));

ALTER TABLE sindvamb.login_history
ALTER
COLUMN reason TYPE VARCHAR(255) USING (reason::VARCHAR(255));

ALTER TABLE sindvamb.company_contact
ALTER
COLUMN role TYPE VARCHAR(255) USING (role::VARCHAR(255));

ALTER TABLE sindvamb.password_history
ALTER
COLUMN security_code TYPE VARCHAR(255) USING (security_code::VARCHAR(255));

ALTER TABLE sindvamb.contact_request
ALTER
COLUMN subject TYPE VARCHAR(255) USING (subject::VARCHAR(255));

ALTER TABLE sindvamb.email_history
ALTER
COLUMN template_key TYPE VARCHAR(255) USING (template_key::VARCHAR(255));

ALTER TABLE sindvamb.portfolio
ALTER
COLUMN title TYPE VARCHAR(255) USING (title::VARCHAR(255));

ALTER TABLE sindvamb.event_customer
ALTER
COLUMN type TYPE VARCHAR(255) USING (type::VARCHAR(255));

ALTER TABLE sindvamb.event
ALTER
COLUMN uf TYPE VARCHAR(255) USING (uf::VARCHAR(255));

ALTER TABLE sindvamb.application_config
ALTER
COLUMN value TYPE VARCHAR(255) USING (value::VARCHAR(255));

ALTER TABLE sindvamb.role
ALTER
COLUMN value TYPE VARCHAR(255) USING (value::VARCHAR(255));