// CustomerService.java
public interface CustomerService {
    Customer createCustomer(Customer customer);

    List<Customer> getAllCustomers(Pageable pageable, String search);

    Customer getCustomerById(Long id);

    Customer updateCustomer(Long id, Customer customer);

    void deleteCustomer(Long id);
}

// CustomerServiceImpl.java
@Service
public class CustomerServiceImpl implements CustomerService {
    @Autowired
    private CustomerRepository customerRepository;

    @Override
    public Customer createCustomer(Customer customer) {
        return customerRepository.save(customer);
    }

    @Override
    public List<Customer> getAllCustomers(Pageable pageable, String search) {
        if (search.isEmpty()) {
            return customerRepository.findAll(pageable).getContent();
        } else {
            return customerRepository.findByFirstNameContainingOrLastNameContainingOrEmailContaining(
                    search, search, search, pageable
            );
        }
    }

    @Override
    public Customer getCustomerById(Long id) {
        return customerRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Customer not found with id: " + id));
    }

    @Override
    public Customer updateCustomer(Long id, Customer customer) {
        Customer existingCustomer = getCustomerById(id);
        // Update fields based on your requirements
        existingCustomer.setFirstName(customer.getFirstName());
        existingCustomer.setLastName(customer.getLastName());
        // Update other fields...

        return customerRepository.save(existingCustomer);
    }

    @Override
    public void deleteCustomer(Long id) {
        Customer customer = getCustomerById(id);
        customerRepository.delete(customer);
    }
}
