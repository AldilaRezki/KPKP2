<?php

namespace App\Policies;

use App\Models\Account;
use App\Models\Test_Submit_Question;
use Illuminate\Auth\Access\Response;

class TestSubmitQuestionPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(Account $account): bool
    {
        //
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(Account $account, Test_Submit_Question $testSubmitQuestion): bool
    {
        //
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(Account $account): bool
    {
        //
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(Account $account, Test_Submit_Question $testSubmitQuestion): bool
    {
        //
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(Account $account, Test_Submit_Question $testSubmitQuestion): bool
    {
        //
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(Account $account, Test_Submit_Question $testSubmitQuestion): bool
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(Account $account, Test_Submit_Question $testSubmitQuestion): bool
    {
        //
    }
}
