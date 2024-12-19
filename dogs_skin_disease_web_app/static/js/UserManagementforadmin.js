document.addEventListener('DOMContentLoaded', () => {
    // Function to fetch users and populate tables
    const fetchUsers = async () => {
        try {
            const token = document.querySelector('meta[name="auth-token"]').getAttribute('content');
            const response = await fetch('http://127.0.0.1:3000/api/admin/users', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const users = await response.json();
                console.log(users);
                populateTables(users);
            } else {
                alert('Failed to fetch users');
            }
        } catch (error) {
            alert('An error occurred: ' + error.message);
        }
    };

    // Function to populate tables with user data
    const populateTables = (users) => {
        const activeTableBody = document.querySelector('#active-users-table tbody');
        const suspendedTableBody = document.querySelector('#suspended-users-table tbody');

        // Clear existing rows
        activeTableBody.innerHTML = '';
        suspendedTableBody.innerHTML = '';

        // Populate tables based on user status
        users.forEach(user => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.id}</td>
                <td>${user.username}</td>
                <td>${user.email}</td>
                <td>${user.first_name}</td>
                <td>${user.last_name}</td>
                <td>${user.phone_number}</td>
                <td>${user.address}</td>
                <td>${user.role}</td>
                <td>${statusToText(user.status)}</td>
                <td>
                    ${user.status === 1 ? `<button class="button button-block" onclick="blockUser(${user.id})">Block</button>` : ''}
                    ${user.status === 0 ? `<button class="button button-activate" onclick="activateUser(${user.id})">Activate</button>` : ''}
                    <button class="button button-delete" onclick="deleteUser(${user.id})">Delete</button>
                </td>
            `;

            // Append row to the appropriate table based on user status
            switch (user.status) {
                case 1:
                    activeTableBody.appendChild(row);
                    break;
                case 0:
                    suspendedTableBody.appendChild(row);
                    break;
            }
        });
    };

    // Convert status code to text
    const statusToText = (status) => {
        switch (status) {
            case 1:
                return 'Active';
            case 0:
                return 'Suspended';
            default:
                return 'Unknown';
        }
    };

    // Fetch and populate users when the page loads
    fetchUsers();

    // Block a user
    window.blockUser = async (id) => {
        const token = document.querySelector('meta[name="auth-token"]').getAttribute('content');

        try {
            const response = await fetch(`http://127.0.0.1:3000/api/admin/users/${id}/block`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                alert('User blocked successfully!');
                fetchUsers(); // Refresh the list of users
            } else {
                const errorData = await response.json();
                alert(`Failed to block user: ${errorData.message}`);
            }
        } catch (error) {
            alert(`An error occurred: ${error.message}`);
        }
    };

    // Activate a user
    window.activateUser = async (id) => {
        const token = document.querySelector('meta[name="auth-token"]').getAttribute('content');

        try {
            const response = await fetch(`http://127.0.0.1:3000/api/admin/users/${id}/activate`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                alert('User activated successfully!');
                fetchUsers(); // Refresh the list of users
            } else {
                const errorData = await response.json();
                alert(`Failed to activate user: ${errorData.message}`);
            }
        } catch (error) {
            alert(`An error occurred: ${error.message}`);
        }
    };

    // Delete a user
    window.deleteUser = async (id) => {
        const token = document.querySelector('meta[name="auth-token"]').getAttribute('content');

        if (confirm('Are you sure you want to delete this user?')) {
            try {
                const response = await fetch(`http://127.0.0.1:3000/api/admin/users/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (response.ok) {
                    alert('User deleted successfully!');
                    fetchUsers(); // Refresh the list of users
                } else {
                    const errorData = await response.json();
                    alert(`Failed to delete user: ${errorData.message}`);
                }
            } catch (error) {
                alert(`An error occurred: ${error.message}`);
            }
        }
    };
});
