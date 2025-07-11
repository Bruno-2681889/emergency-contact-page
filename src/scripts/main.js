document.addEventListener('DOMContentLoaded', function() {
    loadContactData();
});

function calculateAge(birthYear) {
    const currentYear = new Date().getFullYear();
    return currentYear - birthYear;
}

async function loadContactData() {
    try {
        const response = await fetch('data/contacts.json');
        const data = await response.json();
        
        // Calcular idade automaticamente
        const age = calculateAge(data.personal_info.birth_year);
        
        // Atualizar informações pessoais
        document.getElementById('name').textContent = data.personal_info.name;
        document.getElementById('age').textContent = age + ' anos';
        document.getElementById('blood-type').textContent = data.personal_info.blood_type;
        document.getElementById('person-name').textContent = data.personal_info.name;
        
        // Atualizar foto
        document.getElementById('profile-photo').src = data.personal_info.photo;
        document.getElementById('profile-photo').alt = `Foto de ${data.personal_info.name}`;
        
        // Atualizar convênio
        document.getElementById('insurance').textContent = data.insurance_info.provider;
        document.getElementById('policy-number').textContent = data.insurance_info.policy_number;
        document.getElementById('plan-type').textContent = data.insurance_info.plan_type;
        
        // Atualizar cobertura do convênio
        const coverageList = document.getElementById('coverage').querySelector('.coverage-list');
        coverageList.innerHTML = '';
        
        data.insurance_info.coverage.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            coverageList.appendChild(li);
        });
        
        // Atualizar endereço
        document.getElementById('street').textContent = data.address.street;
        document.getElementById('city').textContent = data.address.city;
        document.getElementById('state').textContent = data.address.state;
        document.getElementById('zip').textContent = data.address.zip_code;
        
        // Atualizar contatos
        const contactsList = document.getElementById('contacts-list');
        contactsList.innerHTML = '';
        
        data.contacts.forEach(contact => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${contact.relation}</td>
                <td>${contact.name}</td>
                <td><a href="tel:${contact.phone}" style="color: #3498db; text-decoration: none;">${contact.phone}</a></td>
            `;
            contactsList.appendChild(row);
        });
        
    } catch (error) {
        console.error('Erro ao carregar dados:', error);
        showFallbackData();
    }
}

function showFallbackData() {
    // Calcular idade com base no ano de nascimento (1995)
    const age = calculateAge(1995);
    document.getElementById('age').textContent = age + ' anos';
    
    // Dados de fallback caso o JSON não carregue
    const fallbackContacts = [
        { relation: "Mãe", name: "Neuza Lopes (Somente WhatsApp)", phone: "(11) 97362-8418" },
        { relation: "Tia", name: "Ledimari Lopes (Somente WhatsApp)", phone: "(11) 99502-0998" },
        { relation: "Irmão", name: "Bruno Lopes", phone: "(11) 95778-0014" },
        { relation: "Cunhada", name: "Jessica Karoline", phone: "(11) 96426-9131" }
    ];
    
    const contactsList = document.getElementById('contacts-list');
    contactsList.innerHTML = '';
    
    fallbackContacts.forEach(contact => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${contact.relation}</td>
            <td>${contact.name}</td>
            <td><a href="tel:${contact.phone}" style="color: #3498db; text-decoration: none;">${contact.phone}</a></td>
        `;
        contactsList.appendChild(row);
    });
}