import UserCard from "@/components/UserCard";

const AdminPage = () => {
  return <div className="p-4 flex gap-4 flex-col md:flex-row">
     {/* Left */}
     <div className="w-full lg:w-2/3">
            {/* USER CARDS */}
            <div className="flex gap-4 justify-between flex-wrap">
                <UserCard type="student" />
                <UserCard type="teacher" />
                <UserCard type="parent" />
                <UserCard type="staff" />
            </div>
            {/* MIDDLE CHARTS */}
            <div className="flex gap-4 flex-col lg:flex-row">
              Count Chart 
            </div>
            {/* BOTTOM CHARTS */}
            <div className=""></div>
     </div>
     {/* Right */}
     <div className="w-full lg:w-1/3">r</div>
  </div>;
};

export default AdminPage;