ALTER TABLE sindvamb.employee
    ALTER COLUMN address TYPE VARCHAR(255) USING (address::VARCHAR(255));

ALTER TABLE sindvamb.event
    ALTER COLUMN address TYPE VARCHAR(255) USING (address::VARCHAR(255));

ALTER TABLE sindvamb.address
    ALTER COLUMN address_line1 TYPE VARCHAR(255) USING (address_line1::VARCHAR(255));

ALTER TABLE sindvamb.address
    ALTER COLUMN address_line2 TYPE VARCHAR(255) USING (address_line2::VARCHAR(255));

ALTER TABLE sindvamb.company
    ALTER COLUMN anvisa_training TYPE VARCHAR(255) USING (anvisa_training::VARCHAR(255));

ALTER TABLE sindvamb.company_contact
    ALTER COLUMN area TYPE VARCHAR(255) USING (area::VARCHAR(255));

ALTER TABLE sindvamb."user"
    ALTER COLUMN birthplace TYPE VARCHAR(255) USING (birthplace::VARCHAR(255));

ALTER TABLE sindvamb.access_control
    ALTER COLUMN browser TYPE VARCHAR(255) USING (browser::VARCHAR(255));

ALTER TABLE sindvamb.company
    ALTER COLUMN business_law TYPE VARCHAR(255) USING (business_law::VARCHAR(255));

ALTER TABLE sindvamb."user"
    ALTER COLUMN business_phone TYPE VARCHAR(255) USING (business_phone::VARCHAR(255));

ALTER TABLE sindvamb.contact
    ALTER COLUMN cell_phone TYPE VARCHAR(255) USING (cell_phone::VARCHAR(255));

ALTER TABLE sindvamb.dependent
    ALTER COLUMN cell_phone TYPE VARCHAR(255) USING (cell_phone::VARCHAR(255));

ALTER TABLE sindvamb.employee
    ALTER COLUMN cell_phone TYPE VARCHAR(255) USING (cell_phone::VARCHAR(255));

ALTER TABLE sindvamb."user"
    ALTER COLUMN cell_phone TYPE VARCHAR(255) USING (cell_phone::VARCHAR(255));

ALTER TABLE sindvamb.access_control
    ALTER COLUMN city TYPE VARCHAR(255) USING (city::VARCHAR(255));

ALTER TABLE sindvamb.address
    ALTER COLUMN city TYPE VARCHAR(255) USING (city::VARCHAR(255));

ALTER TABLE sindvamb.company
    ALTER COLUMN civil_defense_training TYPE VARCHAR(255) USING (civil_defense_training::VARCHAR(255));

ALTER TABLE sindvamb."user"
    ALTER COLUMN civil_status TYPE VARCHAR(255) USING (civil_status::VARCHAR(255));

ALTER TABLE sindvamb.customer_type
    ALTER COLUMN code TYPE VARCHAR(255) USING (code::VARCHAR(255));

ALTER TABLE sindvamb.order_status
    ALTER COLUMN code TYPE VARCHAR(255) USING (code::VARCHAR(255));

ALTER TABLE sindvamb.order_type
    ALTER COLUMN code TYPE VARCHAR(255) USING (code::VARCHAR(255));

ALTER TABLE sindvamb.product_category
    ALTER COLUMN code TYPE VARCHAR(255) USING (code::VARCHAR(255));

ALTER TABLE sindvamb.ticket_status
    ALTER COLUMN code TYPE VARCHAR(255) USING (code::VARCHAR(255));

ALTER TABLE sindvamb.address
    ALTER COLUMN complement TYPE VARCHAR(255) USING (complement::VARCHAR(255));

ALTER TABLE sindvamb.company_contact
    ALTER COLUMN corporate_cell_phone TYPE VARCHAR(255) USING (corporate_cell_phone::VARCHAR(255));

ALTER TABLE sindvamb.company_contact
    ALTER COLUMN corporate_email TYPE VARCHAR(255) USING (corporate_email::VARCHAR(255));

ALTER TABLE sindvamb.contact
    ALTER COLUMN cpf_cnpj TYPE VARCHAR(255) USING (cpf_cnpj::VARCHAR(255));

ALTER TABLE sindvamb.dependent
    ALTER COLUMN cpf_cnpj TYPE VARCHAR(255) USING (cpf_cnpj::VARCHAR(255));

ALTER TABLE sindvamb.partner
    ALTER COLUMN cpf_cnpj TYPE VARCHAR(255) USING (cpf_cnpj::VARCHAR(255));

ALTER TABLE sindvamb.partner_unit
    ALTER COLUMN cpf_cnpj TYPE VARCHAR(255) USING (cpf_cnpj::VARCHAR(255));

ALTER TABLE sindvamb.customer_type
    ALTER COLUMN description TYPE VARCHAR(255) USING (description::VARCHAR(255));

ALTER TABLE sindvamb.employee
    ALTER COLUMN description TYPE VARCHAR(255) USING (description::VARCHAR(255));

ALTER TABLE sindvamb.equipament
    ALTER COLUMN description TYPE VARCHAR(255) USING (description::VARCHAR(255));

ALTER TABLE sindvamb.file_control
    ALTER COLUMN description TYPE VARCHAR(255) USING (description::VARCHAR(255));

ALTER TABLE sindvamb.menu
    ALTER COLUMN description TYPE VARCHAR(255) USING (description::VARCHAR(255));

ALTER TABLE sindvamb.menu_item
    ALTER COLUMN description TYPE VARCHAR(255) USING (description::VARCHAR(255));

ALTER TABLE sindvamb."order"
    ALTER COLUMN description TYPE VARCHAR(255) USING (description::VARCHAR(255));

ALTER TABLE sindvamb.order_status
    ALTER COLUMN description TYPE VARCHAR(255) USING (description::VARCHAR(255));

ALTER TABLE sindvamb.order_type
    ALTER COLUMN description TYPE VARCHAR(255) USING (description::VARCHAR(255));

ALTER TABLE sindvamb.product_category
    ALTER COLUMN description TYPE VARCHAR(255) USING (description::VARCHAR(255));

ALTER TABLE sindvamb.ticket_status
    ALTER COLUMN description TYPE VARCHAR(255) USING (description::VARCHAR(255));

ALTER TABLE sindvamb.access_control
    ALTER COLUMN device TYPE VARCHAR(255) USING (device::VARCHAR(255));

ALTER TABLE sindvamb.address
    ALTER COLUMN district TYPE VARCHAR(255) USING (district::VARCHAR(255));

ALTER TABLE sindvamb.contact
    ALTER COLUMN economic_activity TYPE VARCHAR(255) USING (economic_activity::VARCHAR(255));

ALTER TABLE sindvamb.company
    ALTER COLUMN email TYPE VARCHAR(255) USING (email::VARCHAR(255));

ALTER TABLE sindvamb.contact
    ALTER COLUMN email TYPE VARCHAR(255) USING (email::VARCHAR(255));

ALTER TABLE sindvamb.dependent
    ALTER COLUMN email TYPE VARCHAR(255) USING (email::VARCHAR(255));

ALTER TABLE sindvamb.partner
    ALTER COLUMN email TYPE VARCHAR(255) USING (email::VARCHAR(255));

ALTER TABLE sindvamb.partner_unit
    ALTER COLUMN email TYPE VARCHAR(255) USING (email::VARCHAR(255));

ALTER TABLE sindvamb."user"
    ALTER COLUMN email TYPE VARCHAR(255) USING (email::VARCHAR(255));

ALTER TABLE sindvamb.access_control
    ALTER COLUMN engine TYPE VARCHAR(255) USING (engine::VARCHAR(255));

ALTER TABLE sindvamb.event
    ALTER COLUMN event_type TYPE VARCHAR(255) USING (event_type::VARCHAR(255));

ALTER TABLE sindvamb."user"
    ALTER COLUMN father_name TYPE VARCHAR(255) USING (father_name::VARCHAR(255));

ALTER TABLE sindvamb.contact
    ALTER COLUMN fax TYPE VARCHAR(255) USING (fax::VARCHAR(255));

ALTER TABLE sindvamb.portfolio
    ALTER COLUMN file_path TYPE VARCHAR(255) USING (file_path::VARCHAR(255));

ALTER TABLE sindvamb."user"
    ALTER COLUMN gender TYPE VARCHAR(255) USING (gender::VARCHAR(255));

ALTER TABLE sindvamb.menu_item
    ALTER COLUMN gramish TYPE VARCHAR(255) USING (gramish::VARCHAR(255));

ALTER TABLE sindvamb.order_tracking
    ALTER COLUMN history TYPE VARCHAR(255) USING (history::VARCHAR(255));

ALTER TABLE sindvamb."user"
    ALTER COLUMN home_phone TYPE VARCHAR(255) USING (home_phone::VARCHAR(255));

ALTER TABLE sindvamb.address
    ALTER COLUMN housing TYPE VARCHAR(255) USING (housing::VARCHAR(255));

ALTER TABLE sindvamb.company
    ALTER COLUMN inpi_registration TYPE VARCHAR(255) USING (inpi_registration::VARCHAR(255));

ALTER TABLE sindvamb.access_control
    ALTER COLUMN ip TYPE VARCHAR(255) USING (ip::VARCHAR(255));

ALTER TABLE sindvamb.audit
    ALTER COLUMN ip_address TYPE VARCHAR(255) USING (ip_address::VARCHAR(255));

ALTER TABLE sindvamb.audit
    ALTER COLUMN key_values TYPE VARCHAR(255) USING (key_values::VARCHAR(255));

ALTER TABLE sindvamb.access_control
    ALTER COLUMN language TYPE VARCHAR(255) USING (language::VARCHAR(255));

ALTER TABLE sindvamb.company
    ALTER COLUMN legal_nature_code TYPE VARCHAR(255) USING (legal_nature_code::VARCHAR(255));

ALTER TABLE sindvamb.company
    ALTER COLUMN legal_nature_description TYPE VARCHAR(255) USING (legal_nature_description::VARCHAR(255));

ALTER TABLE sindvamb.contact
    ALTER COLUMN main_activity_code TYPE VARCHAR(255) USING (main_activity_code::VARCHAR(255));

ALTER TABLE sindvamb.company
    ALTER COLUMN main_cnae_code TYPE VARCHAR(255) USING (main_cnae_code::VARCHAR(255));

ALTER TABLE sindvamb.company
    ALTER COLUMN main_cnae_description TYPE VARCHAR(255) USING (main_cnae_description::VARCHAR(255));

ALTER TABLE sindvamb.menu_item
    ALTER COLUMN measured_unit TYPE VARCHAR(255) USING (measured_unit::VARCHAR(255));

ALTER TABLE sindvamb."user"
    ALTER COLUMN mother_name TYPE VARCHAR(255) USING (mother_name::VARCHAR(255));

ALTER TABLE sindvamb.company
    ALTER COLUMN municipal_registration TYPE VARCHAR(255) USING (municipal_registration::VARCHAR(255));

ALTER TABLE sindvamb.partner
    ALTER COLUMN name TYPE VARCHAR(255) USING (name::VARCHAR(255));

ALTER TABLE sindvamb.partner_unit
    ALTER COLUMN name TYPE VARCHAR(255) USING (name::VARCHAR(255));

ALTER TABLE sindvamb."user"
    ALTER COLUMN nationality TYPE VARCHAR(255) USING (nationality::VARCHAR(255));

ALTER TABLE sindvamb.address
    ALTER COLUMN neighborhood TYPE VARCHAR(255) USING (neighborhood::VARCHAR(255));

ALTER TABLE sindvamb.audit
    ALTER COLUMN new_values TYPE VARCHAR(255) USING (new_values::VARCHAR(255));

ALTER TABLE sindvamb.password_history
    ALTER COLUMN old_password TYPE VARCHAR(255) USING (old_password::VARCHAR(255));

ALTER TABLE sindvamb.audit
    ALTER COLUMN old_values TYPE VARCHAR(255) USING (old_values::VARCHAR(255));

ALTER TABLE sindvamb.access_control
    ALTER COLUMN os TYPE VARCHAR(255) USING (os::VARCHAR(255));

ALTER TABLE sindvamb."user"
    ALTER COLUMN password TYPE VARCHAR(255) USING (password::VARCHAR(255));

ALTER TABLE sindvamb.company_contact
    ALTER COLUMN personal_cell_phone TYPE VARCHAR(255) USING (personal_cell_phone::VARCHAR(255));

ALTER TABLE sindvamb.company_contact
    ALTER COLUMN phone TYPE VARCHAR(255) USING (phone::VARCHAR(255));

ALTER TABLE sindvamb.contact
    ALTER COLUMN phone TYPE VARCHAR(255) USING (phone::VARCHAR(255));

ALTER TABLE sindvamb."user"
    ALTER COLUMN profession TYPE VARCHAR(255) USING (profession::VARCHAR(255));

ALTER TABLE sindvamb."order"
    ALTER COLUMN protocol TYPE VARCHAR(255) USING (protocol::VARCHAR(255));

ALTER TABLE sindvamb.menu_item
    ALTER COLUMN quantity TYPE VARCHAR(255) USING (quantity::VARCHAR(255));

ALTER TABLE sindvamb."user"
    ALTER COLUMN race TYPE VARCHAR(255) USING (race::VARCHAR(255));

ALTER TABLE sindvamb.registration_request
    ALTER COLUMN reason TYPE VARCHAR(255) USING (reason::VARCHAR(255));

ALTER TABLE sindvamb.access_control
    ALTER COLUMN request_url TYPE VARCHAR(255) USING (request_url::VARCHAR(255));

ALTER TABLE sindvamb.contact_request
    ALTER COLUMN response TYPE VARCHAR(255) USING (response::VARCHAR(255));

ALTER TABLE sindvamb."user"
    ALTER COLUMN rg TYPE VARCHAR(255) USING (rg::VARCHAR(255));

ALTER TABLE sindvamb.company
    ALTER COLUMN sebrae_training TYPE VARCHAR(255) USING (sebrae_training::VARCHAR(255));

ALTER TABLE sindvamb."user"
    ALTER COLUMN securely_phrase TYPE VARCHAR(255) USING (securely_phrase::VARCHAR(255));

ALTER TABLE sindvamb.company
    ALTER COLUMN senac_training TYPE VARCHAR(255) USING (senac_training::VARCHAR(255));

ALTER TABLE sindvamb."order"
    ALTER COLUMN sigla TYPE VARCHAR(255) USING (sigla::VARCHAR(255));

ALTER TABLE sindvamb."user"
    ALTER COLUMN social_name TYPE VARCHAR(255) USING (social_name::VARCHAR(255));

ALTER TABLE sindvamb.ticket
    ALTER COLUMN solution TYPE VARCHAR(255) USING (solution::VARCHAR(255));

ALTER TABLE sindvamb."user"
    ALTER COLUMN special_needs_other TYPE VARCHAR(255) USING (special_needs_other::VARCHAR(255));

ALTER TABLE sindvamb.company
    ALTER COLUMN state_registration TYPE VARCHAR(255) USING (state_registration::VARCHAR(255));

ALTER TABLE sindvamb."user"
    ALTER COLUMN surname TYPE VARCHAR(255) USING (surname::VARCHAR(255));

ALTER TABLE sindvamb.audit
    ALTER COLUMN table_name TYPE VARCHAR(255) USING (table_name::VARCHAR(255));

ALTER TABLE sindvamb.file_control
    ALTER COLUMN target_path TYPE VARCHAR(255) USING (target_path::VARCHAR(255));

ALTER TABLE sindvamb.company
    ALTER COLUMN trade_name TYPE VARCHAR(255) USING (trade_name::VARCHAR(255));

ALTER TABLE sindvamb.dependent
    ALTER COLUMN type TYPE VARCHAR(255) USING (type::VARCHAR(255));

ALTER TABLE sindvamb.equipament
    ALTER COLUMN type TYPE VARCHAR(255) USING (type::VARCHAR(255));

ALTER TABLE sindvamb.menu_item
    ALTER COLUMN type TYPE VARCHAR(255) USING (type::VARCHAR(255));

ALTER TABLE sindvamb.address
    ALTER COLUMN uf TYPE VARCHAR(255) USING (uf::VARCHAR(255));

ALTER TABLE sindvamb."user"
    ALTER COLUMN uf_issuing_body TYPE VARCHAR(255) USING (uf_issuing_body::VARCHAR(255));

ALTER TABLE sindvamb.access_control
    ALTER COLUMN user_name TYPE VARCHAR(255) USING (user_name::VARCHAR(255));

ALTER TABLE sindvamb.order_property
    ALTER COLUMN value TYPE VARCHAR(255) USING (value::VARCHAR(255));

ALTER TABLE sindvamb.ticket_property
    ALTER COLUMN value TYPE VARCHAR(255) USING (value::VARCHAR(255));

ALTER TABLE sindvamb.equipament
    ALTER COLUMN voltage TYPE VARCHAR(255) USING (voltage::VARCHAR(255));

ALTER TABLE sindvamb.company
    ALTER COLUMN website TYPE VARCHAR(255) USING (website::VARCHAR(255));

ALTER TABLE sindvamb.equipament
    ALTER COLUMN weight TYPE VARCHAR(255) USING (weight::VARCHAR(255));

ALTER TABLE sindvamb.address
    ALTER COLUMN zip_code TYPE VARCHAR(255) USING (zip_code::VARCHAR(255));