# 🔐 Admin Panel Guide

## Bharat AI Wealth - Admin Panel Documentation

---

## 📋 Overview

The admin panel provides comprehensive tools for:
- User management
- Security monitoring
- System administration
- Audit log review

**Access:** Only users with `ADMIN` role can access these endpoints.

---

## 🔑 Admin Endpoints

### Base URL: `/api/admin`

All endpoints require `ADMIN` role authentication.

---

## 📊 Dashboard

### GET `/api/admin/dashboard`

Get admin dashboard overview with key metrics.

**Response:**
```json
{
  "totalUsers": 1250,
  "activeUsers": 1180,
  "premiumUsers": 320,
  "inactiveUsers": 70,
  "failedLogins24h": 45,
  "successfulLogins24h": 2340,
  "systemStatus": "healthy",
  "timestamp": "2026-02-27T10:30:00"
}
```

---

## 👥 User Management

### 1. Get All Users

**GET** `/api/admin/users`

**Query Parameters:**
- `page` (default: 0) - Page number
- `size` (default: 20) - Items per page
- `sortBy` (default: createdAt) - Sort field
- `sortDir` (default: DESC) - Sort direction

**Example:**
```bash
GET /api/admin/users?page=0&size=20&sortBy=createdAt&sortDir=DESC
```

**Response:**
```json
{
  "content": [
    {
      "id": 1,
      "email": "user@example.com",
      "name": "John Doe",
      "role": "USER",
      "enabled": true,
      "mfaEnabled": true,
      "createdAt": "2026-01-15T10:30:00",
      "lastLogin": "2026-02-27T09:15:00"
    }
  ],
  "totalElements": 1250,
  "totalPages": 63,
  "number": 0,
  "size": 20
}
```

### 2. Get User Details

**GET** `/api/admin/users/{userId}`

**Example:**
```bash
GET /api/admin/users/123
```

**Response:**
```json
{
  "id": 123,
  "email": "user@example.com",
  "name": "John Doe",
  "role": "USER",
  "enabled": true,
  "mfaEnabled": true,
  "createdAt": "2026-01-15T10:30:00",
  "lastLogin": "2026-02-27T09:15:00"
}
```

### 3. Update User Role

**PUT** `/api/admin/users/{userId}/role`

**Request Body:**
```json
{
  "role": "PREMIUM"
}
```

**Available Roles:**
- `USER` - Regular user
- `PREMIUM` - Premium subscriber
- `ANALYST` - Financial analyst
- `ADMIN` - Administrator

**Response:**
```json
{
  "message": "User role updated successfully",
  "userId": "123",
  "newRole": "PREMIUM"
}
```

### 4. Update User Status

**PUT** `/api/admin/users/{userId}/status`

**Request Body:**
```json
{
  "enabled": false
}
```

**Response:**
```json
{
  "message": "User status updated successfully",
  "userId": "123",
  "enabled": "false"
}
```

### 5. Delete User

**DELETE** `/api/admin/users/{userId}`

**Response:**
```json
{
  "message": "User deleted successfully",
  "userId": "123"
}
```

**Note:** Cannot delete your own admin account.

---

## 🔒 Security Monitoring

### 1. Get Audit Logs

**GET** `/api/admin/security/audit-logs`

**Query Parameters:**
- `page` (default: 0)
- `size` (default: 50)
- `eventType` (optional) - Filter by event type
- `userId` (optional) - Filter by user

**Example:**
```bash
GET /api/admin/security/audit-logs?page=0&size=50&eventType=LOGIN_FAILURE
```

**Response:**
```json
{
  "content": [
    {
      "id": 1,
      "userId": "user@example.com",
      "eventType": "LOGIN_FAILURE",
      "ipAddress": "192.168.1.100",
      "userAgent": "Mozilla/5.0...",
      "details": {"reason": "Invalid password"},
      "timestamp": "2026-02-27T10:30:00"
    }
  ],
  "totalElements": 450,
  "totalPages": 9,
  "number": 0,
  "size": 50
}
```

**Event Types:**
- `LOGIN_SUCCESS`
- `LOGIN_FAILURE`
- `LOGOUT`
- `PASSWORD_CHANGE`
- `MFA_ENABLED`
- `MFA_DISABLED`
- `ACCOUNT_LOCKED`
- `SUSPICIOUS_ACTIVITY`
- `UNAUTHORIZED_ACCESS_ATTEMPT`

### 2. Get Failed Logins

**GET** `/api/admin/security/failed-logins`

**Query Parameters:**
- `hours` (default: 24) - Time window in hours

**Example:**
```bash
GET /api/admin/security/failed-logins?hours=24
```

**Response:**
```json
[
  {
    "ipAddress": "192.168.1.100",
    "failedAttempts": 15
  },
  {
    "ipAddress": "10.0.0.50",
    "failedAttempts": 8
  }
]
```

### 3. Get Suspicious Activity

**GET** `/api/admin/security/suspicious-activity`

**Query Parameters:**
- `hours` (default: 24) - Time window in hours

**Example:**
```bash
GET /api/admin/security/suspicious-activity?hours=24
```

**Response:**
```json
[
  {
    "id": 1,
    "userId": "user@example.com",
    "eventType": "SUSPICIOUS_ACTIVITY",
    "ipAddress": "192.168.1.100",
    "details": {
      "reason": "Multiple failed login attempts",
      "attempts": 10
    },
    "timestamp": "2026-02-27T10:30:00"
  }
]
```

---

## ⚙️ System Administration

### 1. Get System Stats

**GET** `/api/admin/system/stats`

**Response:**
```json
{
  "usersByRole": {
    "USER": 850,
    "PREMIUM": 320,
    "ANALYST": 15,
    "ADMIN": 5
  },
  "loginsLast7Days": 15420,
  "securityEventsLast7Days": 2340
}
```

### 2. Clear Cache

**POST** `/api/admin/system/clear-cache`

**Response:**
```json
{
  "message": "Cache cleared successfully",
  "timestamp": "2026-02-27T10:30:00"
}
```

---

## 🔐 Security Features

### 1. Role-Based Access Control

All admin endpoints require `ADMIN` role:

```java
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {
    // All methods require ADMIN role
}
```

### 2. Audit Logging

All admin actions are logged:
- User role changes
- User status changes
- User deletions
- Cache clears
- System modifications

### 3. IP Tracking

All requests include IP address tracking for security monitoring.

### 4. Self-Protection

Admins cannot:
- Delete their own account
- Demote themselves
- Lock themselves out

---

## 📱 Frontend Integration

### Example: React Admin Dashboard

```typescript
// Admin Dashboard Component
import { useEffect, useState } from 'react';

function AdminDashboard() {
  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    fetch('/api/admin/dashboard', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(res => res.json())
    .then(data => setDashboard(data));
  }, []);

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <div className="stats">
        <div>Total Users: {dashboard?.totalUsers}</div>
        <div>Active Users: {dashboard?.activeUsers}</div>
        <div>Premium Users: {dashboard?.premiumUsers}</div>
        <div>Failed Logins (24h): {dashboard?.failedLogins24h}</div>
      </div>
    </div>
  );
}
```

### Example: User Management

```typescript
// User List Component
function UserList() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);

  const loadUsers = async () => {
    const response = await fetch(
      `/api/admin/users?page=${page}&size=20`,
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    );
    const data = await response.json();
    setUsers(data.content);
  };

  const updateUserRole = async (userId, newRole) => {
    await fetch(`/api/admin/users/${userId}/role`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ role: newRole })
    });
    loadUsers(); // Reload list
  };

  return (
    <div>
      <h2>User Management</h2>
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Name</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.email}</td>
              <td>{user.name}</td>
              <td>{user.role}</td>
              <td>{user.enabled ? 'Active' : 'Disabled'}</td>
              <td>
                <button onClick={() => updateUserRole(user.id, 'PREMIUM')}>
                  Make Premium
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
```

---

## 🧪 Testing Admin Endpoints

### Using cURL:

```bash
# 1. Login as admin
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"AdminPass123!"}'

# Save the token
TOKEN="your_jwt_token_here"

# 2. Get dashboard
curl -X GET http://localhost:8080/api/admin/dashboard \
  -H "Authorization: Bearer $TOKEN"

# 3. Get all users
curl -X GET "http://localhost:8080/api/admin/users?page=0&size=20" \
  -H "Authorization: Bearer $TOKEN"

# 4. Update user role
curl -X PUT http://localhost:8080/api/admin/users/123/role \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"role":"PREMIUM"}'

# 5. Get audit logs
curl -X GET "http://localhost:8080/api/admin/security/audit-logs?page=0&size=50" \
  -H "Authorization: Bearer $TOKEN"

# 6. Get failed logins
curl -X GET "http://localhost:8080/api/admin/security/failed-logins?hours=24" \
  -H "Authorization: Bearer $TOKEN"
```

---

## 🔒 Security Best Practices

### 1. Admin Account Security

```
✅ Use strong passwords (16+ characters)
✅ Enable MFA for all admin accounts
✅ Limit number of admin accounts (max 3-5)
✅ Regular password rotation (every 90 days)
✅ Monitor admin activity logs
```

### 2. Access Control

```
✅ Follow principle of least privilege
✅ Create separate accounts for different roles
✅ Don't share admin credentials
✅ Use personal accounts for daily work
✅ Admin account only for admin tasks
```

### 3. Monitoring

```
✅ Review audit logs daily
✅ Monitor failed login attempts
✅ Check for suspicious activity
✅ Set up alerts for critical events
✅ Regular security audits
```

---

## 📊 Admin Dashboard Metrics

### Key Metrics to Monitor:

1. **User Metrics**
   - Total users
   - Active vs inactive
   - Premium subscribers
   - New registrations (daily/weekly)

2. **Security Metrics**
   - Failed login attempts
   - Successful logins
   - Blocked IPs
   - Suspicious activities

3. **System Metrics**
   - API response times
   - Error rates
   - Database performance
   - Server health

---

## 🚨 Common Admin Tasks

### 1. Handle Suspicious Activity

```
1. Check failed login attempts
   GET /api/admin/security/failed-logins

2. Review suspicious activity
   GET /api/admin/security/suspicious-activity

3. If confirmed attack:
   - Block IP (if not already blocked)
   - Disable affected user accounts
   - Force password reset
   - Notify security team
```

### 2. User Support

```
1. User forgot password:
   - Verify user identity
   - Send password reset link
   - Monitor for successful reset

2. User locked out:
   - Check audit logs
   - Verify legitimate user
   - Re-enable account
   PUT /api/admin/users/{userId}/status

3. Upgrade to premium:
   - Verify payment
   - Update user role
   PUT /api/admin/users/{userId}/role
```

### 3. System Maintenance

```
1. Clear cache after updates:
   POST /api/admin/system/clear-cache

2. Review system stats:
   GET /api/admin/system/stats

3. Check audit logs:
   GET /api/admin/security/audit-logs
```

---

## ✅ Admin Panel Checklist

### Daily Tasks:
- [ ] Review dashboard metrics
- [ ] Check failed login attempts
- [ ] Review suspicious activity
- [ ] Monitor system health

### Weekly Tasks:
- [ ] Review all audit logs
- [ ] Check user growth metrics
- [ ] Review admin actions
- [ ] Update security policies

### Monthly Tasks:
- [ ] Full security audit
- [ ] Review admin access
- [ ] Update documentation
- [ ] Performance review

---

## 🎉 Summary

**Admin Panel Features:**
✅ Complete user management
✅ Security monitoring
✅ Audit log review
✅ System administration
✅ Role-based access control
✅ IP tracking
✅ Comprehensive logging

**Security Level:** HIGH ✅
**Production Ready:** YES ✅
**Documentation:** COMPLETE ✅

---

**Your admin panel is secure and ready to use!** 🚀
