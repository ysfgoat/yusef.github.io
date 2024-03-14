const discordAvatarElement = document.querySelector('.discord-avatar');
const statusBoxElement = document.querySelector('.status-box');

fetch('https://api.lanyard.rest/v1/users/885313174377730128')
    .then(response => response.json())
    .then(data => {
        const discordData = data.data;
        const { discord_user, discord_status, activities } = discordData;

        // Update the profile picture
        const avatarUrl = `https://cdn.discordapp.com/avatars/${discord_user.id}/${discord_user.avatar}.png`;
        discordAvatarElement.src = avatarUrl;

        // Update username
        document.querySelector('.presence-info p:first-child').textContent = `Username: ${discord_user.username}`;
        document.querySelector('.presence-info p:nth-child(2)').textContent = `Global Name: ${discord_user.global_name}`;

        // Update activity
        if (activities.length > 0) {
            let activity = '';
            activities.forEach(item => {
                if (item.type === 0) {
                    activity += `Playing ${item.name}: ${item.details}`;
                } else if (item.type === 2) {
                    activity += `Listening to ${item.state}: ${item.details}`;
                }
            });
            document.querySelector('.presence-info p:nth-child(3)').textContent = `Activity: ${activity}`;
        } else {
            document.querySelector('.presence-info p:nth-child(3)').textContent = `Activity: None`;
        }

        // Update status box
        switch (discord_status) {
            case 'online':
                statusBoxElement.classList.remove('dnd', 'offline');
                statusBoxElement.classList.add('online');
                statusBoxElement.textContent = 'Online';
                break;
            case 'dnd':
                statusBoxElement.classList.remove('online', 'offline');
                statusBoxElement.classList.add('dnd');
                statusBoxElement.textContent = 'DnD';
                break;
            default:
                statusBoxElement.classList.remove('online', 'dnd');
                statusBoxElement.classList.add('offline');
                statusBoxElement.textContent = 'Offline';
                break;
        }
    })
    .catch(error => {
        console.error('Error fetching Discord presence data:', error);
        discordAvatarElement.src = 'pfp.png'; // Replace with a placeholder image or leave blank
    });