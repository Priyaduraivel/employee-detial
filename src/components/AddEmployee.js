import React, { useState } from 'react';
import {
    TextField,
    MenuItem,
    Select,
    Button,
    Typography,
    Container,
    Box,
    Alert,
    FormControl,
    InputLabel
} from '@mui/material';
import axios from 'axios';

const AddEmployee = () => {
    const [formData, setFormData] = useState({
        name: '',
        employeeId: '',
        email: '',
        phone: '',
        department: '',
        dateOfJoining: '',
        role: ''
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validate = () => {
        if (!formData.name.trim()) return 'Name is required';
        if (!/^[a-zA-Z0-9]{1,10}$/.test(formData.employeeId)) return 'Invalid Employee ID format';
        if (!/^\S+@\S+\.\S+$/.test(formData.email)) return 'Invalid email format';
        if (!/^\d{10}$/.test(formData.phone)) return 'Phone number must be 10 digits';
        if (!formData.department) return 'Department is required';
        if (!formData.dateOfJoining || new Date(formData.dateOfJoining) > new Date()) return 'Invalid Date of Joining';
        if (!formData.role.trim()) return 'Role is required';
        return '';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        const validationError = validate();
        if (validationError) {
            setError(validationError);
            return;
        }

        setIsSubmitting(true);
        try {
            const response = await axios.post('http://localhost:5000/api/employees', formData);
            setSuccess(response.data.message);
            setFormData({
                name: '',
                employeeId: '',
                email: '',
                phone: '',
                department: '',
                dateOfJoining: '',
                role: ''
            });
        } catch (error) {
            setError(error.response?.data?.message || 'An error occurred');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleReset = () => {
        setFormData({
            name: '',
            employeeId: '',
            email: '',
            phone: '',
            department: '',
            dateOfJoining: '',
            role: ''
        });
        setError('');
        setSuccess('');
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 5 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Employee Details
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                <TextField
                    label="Employee ID"
                    name="employeeId"
                    value={formData.employeeId}
                    onChange={handleChange}
                    required
                />
                <TextField
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <TextField
                    label="Phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    inputProps={{ pattern: "\\d{10}" }}
                />
                <FormControl required>
                    <InputLabel>Department</InputLabel>
                    <Select
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                    >
                        <MenuItem value="HR">HR</MenuItem>
                        <MenuItem value="Engineering">Engineering</MenuItem>
                        <MenuItem value="Marketing">Marketing</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    label="Date of Joining"
                    name="dateOfJoining"
                    type="date"
                    value={formData.dateOfJoining}
                    onChange={handleChange}
                    InputLabelProps={{ shrink: true }}
                    required
                />
                <TextField
                    label="Role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    required
                />
                <Button variant="contained" color="primary" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                </Button>
                <Button variant="outlined" color="secondary" onClick={handleReset}>
                    Reset
                </Button>
                {error && <Alert severity="error">{error}</Alert>}
                {success && <Alert severity="success">{success}</Alert>}
            </Box>
        </Container>
    );
};

export default AddEmployee;
