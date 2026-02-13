import requests
import sys
from datetime import datetime
import json

class CorporateWebsiteAPITester:
    def __init__(self, base_url="https://corporate-webdev.preview.emergentagent.com"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.failed_tests = []

    def run_test(self, name, method, endpoint, expected_status, data=None, headers=None):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}"
        if headers is None:
            headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)

            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    response_data = response.json()
                    print(f"Response: {json.dumps(response_data, indent=2)}")
                except:
                    print(f"Response: {response.text}")
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                print(f"Response: {response.text}")
                self.failed_tests.append({
                    "test": name,
                    "expected": expected_status,
                    "actual": response.status_code,
                    "response": response.text
                })

            return success, response.json() if success and response.content else {}

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            self.failed_tests.append({
                "test": name,
                "error": str(e)
            })
            return False, {}

    def test_root_endpoint(self):
        """Test root API endpoint"""
        return self.run_test(
            "Root API Endpoint",
            "GET",
            "api/",
            200
        )

    def test_contact_form_submission(self):
        """Test contact form submission with valid data"""
        contact_data = {
            "name": "John Doe",
            "email": "john.doe@example.com",
            "phone": "+1-555-123-4567",
            "company": "Test Company",
            "message": "This is a test message for the contact form."
        }
        
        return self.run_test(
            "Contact Form Submission",
            "POST",
            "api/contact",
            200,
            data=contact_data
        )

    def test_contact_form_validation(self):
        """Test contact form with missing required fields"""
        invalid_data = {
            "name": "",  # Missing required name
            "email": "invalid-email",  # Invalid email format
            "message": ""  # Missing required message
        }
        
        success, response = self.run_test(
            "Contact Form Validation (Invalid Data)",
            "POST",
            "api/contact",
            422,  # Expecting validation error
            data=invalid_data
        )
        return success

    def test_newsletter_subscription(self):
        """Test newsletter subscription with valid email"""
        newsletter_data = {
            "email": f"test.{datetime.now().strftime('%Y%m%d%H%M%S')}@example.com"
        }
        
        return self.run_test(
            "Newsletter Subscription",
            "POST",
            "api/newsletter",
            200,
            data=newsletter_data
        )

    def test_newsletter_duplicate_email(self):
        """Test newsletter subscription with duplicate email"""
        # First subscription
        email = f"duplicate.{datetime.now().strftime('%Y%m%d%H%M%S')}@example.com"
        newsletter_data = {"email": email}
        
        # First subscription should succeed
        success1, _ = self.run_test(
            "Newsletter First Subscription",
            "POST",
            "api/newsletter",
            200,
            data=newsletter_data
        )
        
        if success1:
            # Second subscription should fail with 400
            success2, _ = self.run_test(
                "Newsletter Duplicate Email",
                "POST",
                "api/newsletter",
                400,
                data=newsletter_data
            )
            return success2
        return False

def main():
    print("🚀 Starting Corporate Website API Tests")
    print("=" * 50)
    
    # Setup
    tester = CorporateWebsiteAPITester()
    
    # Run all tests
    print("\n📋 Running Backend API Tests...")
    
    # Test basic connectivity
    tester.test_root_endpoint()
    
    # Test contact form functionality
    tester.test_contact_form_submission()
    tester.test_contact_form_validation()
    
    # Test newsletter functionality
    tester.test_newsletter_subscription()
    tester.test_newsletter_duplicate_email()
    
    # Print final results
    print("\n" + "=" * 50)
    print(f"📊 Test Results: {tester.tests_passed}/{tester.tests_run} tests passed")
    
    if tester.failed_tests:
        print("\n❌ Failed Tests:")
        for failure in tester.failed_tests:
            print(f"  - {failure}")
    
    success_rate = (tester.tests_passed / tester.tests_run) * 100 if tester.tests_run > 0 else 0
    print(f"📈 Success Rate: {success_rate:.1f}%")
    
    return 0 if tester.tests_passed == tester.tests_run else 1

if __name__ == "__main__":
    sys.exit(main())